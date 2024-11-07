const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

const { auth, requiresAuth } = require('express-openid-connect');
const dotEnv = require('dotenv');
dotEnv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};
router.use(auth(config));

/**
 * @swagger
 * /:
 *  get:
 *      summary: Get an authentication state
 *      description: Retrieve authentication 
 *      responses:
 *          200:
 *             description: A successful response authentication
 */
router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

router.get('/',  homeController.homeRoute);

/**
 * @swagger
 * /profile:
 *  get:
 *      summary: Get user profile
 *      description: Retrieve user profile
 *      security:
 *      - OpenID: []
 *      responses:
 *          200:
 *              description: A successful response with user profile
 */
router.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

module.exports = router;