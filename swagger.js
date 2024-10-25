const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book API',
    description: 'Documentaion of Book API',
  },
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

// generate swagger.json
// swaggerAutogen(outputFile, routes, doc);

// run server after generating swagger.json
swaggerAutogen(outputFile, routes, doc).then(async () => {
    await import('./index.js');
});