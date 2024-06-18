import 'reflect-metadata';
import express from 'express';
import { Employee } from './models/employee.model';
import { DbConnection } from './db/db';
import employeeController from './controller/employee.controller';
import loginController from './controller/login.controller';
import * as dotenv from 'dotenv';
import { Secret, sign } from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:4000',
  allowedHeaders: ['Authorization', 'Content-Type'], 
};

app.use(cors(corsOptions));
app.use(express.json());

async function startServer() {
    try {
        // init
        dotenv.config({path:'./src/properties.env'});
        const secretBuffer = Buffer.from(process.env.JWT_SECRET as string);
        await DbConnection.initialize();
        const employeeRepository = DbConnection.getRepository(Employee);

        // Check if database exists or create it
        const result = await DbConnection.query(
            'SELECT 1 FROM pg_database WHERE datname=$1',
            ['datavidcake']
        );
        if (result && result.length > 0) {
            console.log('Database already exists');
        } else {
            try {
                await DbConnection.query('CREATE DATABASE datavidcake');
                console.log('Database created successfully');
            } catch (err) {
                console.error('Error creating database:', err);
                throw err; 
            }
        }

        // Routes
        app.use('/employees', employeeController(employeeRepository, secretBuffer));
        app.use('/login', loginController(secretBuffer));

        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error('Error initializing server or database connection:', error);
    }
}
startServer();