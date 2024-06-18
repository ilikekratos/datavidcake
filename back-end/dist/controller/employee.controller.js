"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const router = (0, express_1.Router)();
function verifyToken(req, secret) {
    // Extract token from headers (replace 'authorization' with your header name if different)
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return false;
    }
    const token = authHeader.split(' ')[1];
    try {
        (0, jsonwebtoken_1.verify)(token, secret, (err, decoded) => {
            if (err) {
                return false;
            }
            return true;
        });
    }
    catch (error) {
        return false;
    }
}
;
exports.default = (employeeRepository, secret) => {
    // GET /employees
    router.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const verified = verifyToken(req, secret);
            if (verified === false) {
                throw (Error("Failed JWTOKEN"));
            }
            const employees = yield employeeRepository.find();
            console.log(employees);
            res.json(employees);
        }
        catch (error) {
            console.error('Error fetching employees:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    // POST /employees
    router.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const verified = verifyToken(req, secret);
            if (verified === false) {
                throw (Error("Failed JWTOKEN"));
            }
            const { firstName, lastName, birthDate, country, city } = req.body;
            //validate data is not null
            if (!firstName || !lastName || !birthDate || !country || !city) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            // Ensure birthDate is a valid date
            const parsedBirthDate = new Date(Date.parse(birthDate));
            if (isNaN(parsedBirthDate.getTime())) {
                return res.status(400).json({ error: 'Invalid birthDate format' });
            }
            const formattedBirthDate = parsedBirthDate.toISOString().split('T')[0];
            try {
                const newEmployee = employeeRepository.create({
                    firstName,
                    lastName,
                    birthDate: formattedBirthDate,
                    country,
                    city,
                });
                yield employeeRepository.save(newEmployee);
                res.status(201).json(newEmployee);
            }
            catch (error) {
                if (error.code === '23505') { // PostgreSQL unique constraint violation code
                    res.status(400).json({ error: 'employee with this combination already exists' });
                }
                else {
                    console.error('Error creating employee:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        }
        catch (error) {
            console.error('Error creating employee:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    // DELETE /employees/:id
    router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const verified = verifyToken(req, secret);
            if (verified === false) {
                throw (Error("Failed JWTOKEN"));
            }
            const employee = yield employeeRepository.findOne({
                where: {
                    id: parseInt(req.params.id),
                }
            });
            if (!employee) {
                return res.status(404).json({ error: 'employee not found' });
            }
            yield employeeRepository.remove(employee); // or employeeRepository.delete(id);
            res.json({ message: 'Employee deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting employee:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    return router;
};
//# sourceMappingURL=employee.controller.js.map