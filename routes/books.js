const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const {auth, requiresAuth} = require('express-openid-connect');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      OpenID:
 *          type: openIdConnect
 *          openIdConnectUrl: https://dev-chzyktgeb1bxu54p.us.auth0.com
 */

router.use(auth(config));

const booksController = require('../controllers/books');

/**
 * @swagger
 * /books/:
 * get:
 *  summary: Get all books
 *  description: Retrieve a list of all books
 *  responses:
 *      200:
 *          description: A list of books
 */
router.get('/', booksController.getAll);

/**
 * swagger
 * /books/{id}:
 * get:
 *  summary: Get a single book
 *  description: Retrieve a single book
 *  parameters:
 *     - in: path
 *      name: id
 *     required: true
 *    description: ID of the book to retrieve
 *   schema:
 *     type: string
 *  responses:
 *      200:
 *          description: A single book
 */
router.get('/:id', booksController.getSingle);

router.post('/', validate.saveBook, booksController.create);
router.put('/:id', validate.saveBook, booksController.update);

/**
 * swagger
 * /books/{id}:
 *  delete:
 *      summary: Delete a book
 *      description: Delete a book
 *      parameters:
 *          - in: path
 *          name: id
 *          required: true
 *          description: ID of the book to delete
 *          schema:
 *              type: string
 *      security:
 *          - OpenID: []
 *      responses:
 *          200:
 *              description: A single book deleted
 *          404:
 *              description: Book not found
 *          500:
 *              description: Internal server error
 */
router.delete('/:id', booksController.deleteOne);

module.exports = router;