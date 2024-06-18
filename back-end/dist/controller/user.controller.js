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
const router = (0, express_1.Router)();
exports.default = (userRepository) => {
    // GET /users
    router.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userRepository.find();
            console.log(users);
            res.json(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    // POST /users
    router.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
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
                const newUser = userRepository.create({
                    firstName,
                    lastName,
                    birthDate: formattedBirthDate, // Use the parsed date
                    country,
                    city,
                });
                yield userRepository.save(newUser);
                res.status(201).json(newUser);
            }
            catch (error) {
                if (error.code === '23505') { // PostgreSQL unique constraint violation code
                    res.status(400).json({ error: 'User with this combination already exists' });
                }
                else {
                    console.error('Error creating user:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        }
        catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    return router;
};
//# sourceMappingURL=user.controller.js.map