
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // OpenAPI ভার্সন
    info: {
      title: "FinupsBd API", // তোমার প্রজেক্টের নাম
      version: "1.0.0",
      description: "FinupsBD Backend API Documentation",
    },
    servers: [
      {
        url: "http://localhost:4000", // লোকাল সার্ভার
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/app/module/**/*.ts", "./src/app/**/*.ts"],

};



export const specs = swaggerJsdoc(swaggerOptions);