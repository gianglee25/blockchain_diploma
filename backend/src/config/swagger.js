// backend/src/config/swagger.js
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Hệ thống Văn bằng Blockchain',
            version: '1.0.0',
            description: 'Tài liệu API cho hệ thống quản lý, cấp phát và tra cứu văn bằng (MERN + Hyperledger Fabric).',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local Development Server',
            },
        ],
    },
    // Trỏ đường dẫn để Swagger quét các file route và lấy cấu hình comment
    apis: ['./src/routes/*.js'], 
};

const specs = swaggerJsDoc(options);

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
    console.log('Swagger chạy tại: http://localhost:5000/api-docs');
};