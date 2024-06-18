import { DataSource } from 'typeorm';
import { Employee } from '../models/employee.model';

export const DbConnection = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'datavidcake',
    synchronize: true,
    logging: false,
    entities: [Employee]
});