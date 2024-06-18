"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbConnection = void 0;
const typeorm_1 = require("typeorm");
const employee_model_1 = require("../models/employee.model");
exports.DbConnection = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'datavidcake',
    synchronize: true,
    logging: false,
    entities: [employee_model_1.Employee]
});
//# sourceMappingURL=db.js.map