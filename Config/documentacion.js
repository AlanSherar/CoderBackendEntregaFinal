import swaggerJsdoc from "swagger-jsdoc"

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Entrega Final  - Documentación',
          description:
              'Se visualizan los endpoints disponibles del proyecto final Ecommerce-Backend',
      },
  },
  apis: [`./Documentacion/*.yaml`],
};

export const swaggerSpecs = swaggerJsdoc(options);