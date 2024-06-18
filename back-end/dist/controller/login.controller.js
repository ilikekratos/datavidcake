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
const jsonwebtoken_1 = require("jsonwebtoken"); // Import the sign function from jsonwebtoken
const router = (0, express_1.Router)();
exports.default = (secret) => {
    router.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: 'All fields are required' });
            }
            if (username === 'admin' && password === 'admin') {
                // User credentials are valid (replace with actual validation)
                const payload = { username };
                // Sign the JWT token
                const token = (0, jsonwebtoken_1.sign)(payload, secret, { expiresIn: '1h' }); // Set appropriate expiration time
                return res.status(200).json({ token }); // Send the token in the response
            }
            else {
                return res.status(401).json({ error: 'Invalid username or password' }); // Handle invalid credentials
            }
        }
        catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }));
    return router;
};
//# sourceMappingURL=login.controller.js.map