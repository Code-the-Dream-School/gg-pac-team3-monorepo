import express from 'express';
import cors from 'cors';
import favicon from 'express-favicon';
import logger from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.mjs';
import courseRoutes from './routes/courseRoutes.mjs';
import mainRouter from './routes/mainRouter.mjs';
import lessonRoutes from './routes/lessonRoutes.mjs';
import quizRoutes from './routes/quizRoutes.mjs';
import userCourseRoutes from './routes/userCourseRoutes.mjs';
import UserFeedback from './routes/userFeedbackRoutes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.static('public'));
app.use(favicon(new URL('./public/favicon.ico', import.meta.url).pathname));

// Swagger Setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Learning Hub API',
      version: '1.0.0',
      description: 'API documentation for the Learning Hub application',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://learninghub-iu98.onrender.com' 
          : 'http://localhost:8000',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./server/routes/*.mjs'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/', mainRouter);
app.use('/api/user', userRoutes);
app.use('/api/user/UserFeedback', UserFeedback);
app.use('/api/course', courseRoutes);
app.use('/api/course', lessonRoutes);
app.use('/api/course', quizRoutes);
app.use('/api', userCourseRoutes);

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})

export default app;