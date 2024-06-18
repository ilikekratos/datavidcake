"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const employee_model_1 = require("./models/employee.model");
const db_1 = require("./db/db");
const employee_controller_1 = __importDefault(require("./controller/employee.controller"));
const login_controller_1 = __importDefault(require("./controller/login.controller"));
const dotenv = __importStar(require("dotenv"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            dotenv.config({ path: './src/properties.env' });
            const secretBuffer = Buffer.from(process.env.JWT_SECRET);
            yield db_1.DbConnection.initialize();
            const employeeRepository = db_1.DbConnection.getRepository(employee_model_1.Employee);
            // Check if database exists
            const result = yield db_1.DbConnection.query('SELECT 1 FROM pg_database WHERE datname=$1', ['datavidcake']);
            // Check if result contains any rows
            if (result && result.length > 0) {
                console.log('Database already exists');
            }
            else {
                // Database does not exist, create it
                try {
                    yield db_1.DbConnection.query('CREATE DATABASE datavidcake');
                    console.log('Database created successfully');
                }
                catch (err) {
                    console.error('Error creating database:', err);
                    throw err; // Propagate the error to handle it outside if needed
                }
            }
            // Use the employee controller routes
            app.use('/employees', (0, employee_controller_1.default)(employeeRepository, secretBuffer));
            app.use('/login', (0, login_controller_1.default)(secretBuffer));
            app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port}`);
            });
        }
        catch (error) {
            console.error('Error initializing server or database connection:', error);
        }
    });
}
// Call startServer to start the application
startServer();
//# sourceMappingURL=index.js.map