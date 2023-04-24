import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'blog',
      version: '1.0.0',
      description: 'blog api'
    },
  },
  apis: [ './routes/*.js' ],
}

const specs = swaggerJsdoc(options)
console.log(specs);

export default (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}

