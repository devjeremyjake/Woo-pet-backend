import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import petsRoutes from './routes/pets.routes';
import categoryRoutes from './routes/category.routes';
import servicesRoutes from './routes/service.routes';

dotenv.config();

const app = express();
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// swagger configuration
const swaggerDefinition = {
	info: {
		title: "Woo Pet API Documentation",
		version: "1.0.0",
		description: "A pet service market place",
	},
	host: `localhost:${process.env.PORT}`,
	basePath: "/",
	securityDefinitions: {
		bearerAuth: {
			type: "apiKey",
			name: "Authorization",
			in: "header",
		},
	},
};

const options = {
	swaggerDefinition,
	apis: ['src/routes/**.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get("/swagger.json", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(swaggerSpec);
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', [authRoutes, profileRoutes, petsRoutes, categoryRoutes, servicesRoutes]);

// test sample
app.get('/', (req, res) => {
	res.send('Live here');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

export default app;
