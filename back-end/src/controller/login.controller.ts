import { Router, Request, Response } from 'express';
import { Secret, sign } from 'jsonwebtoken'; // Import the sign function from jsonwebtoken
import { Repository } from "typeorm";
import { Employee } from "../models/employee.model";

interface LoginCredentials {
  username: string;
  password: string;
}

interface JwtPayload {
  [key: string]: string | number; // Flexible payload structure
}

const router = Router();

export default (secret:Secret) => {
  router.post('', async (req: Request<{}, {}, LoginCredentials>, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      if (username === 'admin' && password === 'admin') {
       
        const payload: JwtPayload = { username }; 

        const token = sign(payload, secret, { expiresIn: '1h' }); 

        return res.status(200).json({ token }); 
      } else {
        return res.status(401).json({ error: 'Invalid username or password' }); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};