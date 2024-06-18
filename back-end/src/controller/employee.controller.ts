import { Router, Request, Response } from 'express';
import { Repository } from "typeorm";
import { Employee } from "../models/employee.model";
import { Secret ,verify} from 'jsonwebtoken';
const router = Router();
function verifyToken(req: Request,secret:Secret) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  try {
    verify(token, secret, (err, decoded) => {
      if (err) {
        return false;
      }
      return true;

    });
  } catch (error) {
    return false;
  }
};

export default (employeeRepository: Repository<Employee>,secret:Secret) => {
  // GET /employees
  router.get('', async (req: Request, res: Response) => {
    try {
      const verified=verifyToken(req,secret);
      if(verified===false){
        throw(Error("Failed JWTOKEN"));
      }
      const employees = await employeeRepository.find();
      console.log(employees);
      res.json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // POST /employees
  router.post('', async (req: Request, res: Response) => {
    try {
      const verified=verifyToken(req,secret);
      if(verified===false){
        throw(Error("Failed JWTOKEN"));
      }
      const { firstName, lastName, birthDate, country, city } = req.body;
      if (!firstName || !lastName || !birthDate || !country || !city) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const parsedBirthDate = new Date(Date.parse(birthDate));
      if (isNaN(parsedBirthDate.getTime())) {
        return res.status(400).json({ error: 'Invalid birthDate format' });
      }

      const formattedBirthDate = parsedBirthDate.toISOString().split('T')[0];

      try{
        const newEmployee = employeeRepository.create({
          firstName,
          lastName,
          birthDate: formattedBirthDate,
          country,
          city,
        });
        await employeeRepository.save(newEmployee);
        res.status(201).json(newEmployee);
      }
      catch (error:any) {
        if (error.code === '23505') { // PostgreSQL unique constraint violation code
            res.status(400).json({ error: 'employee with this combination already exists' });
        } else {
            console.error('Error creating employee:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // DELETE /employees/:id
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const verified=verifyToken(req,secret);
      if(verified===false){
        throw(Error("Failed JWTOKEN"));
      }
      const employee = await employeeRepository.findOne(
        {
          where:{
            id: parseInt(req.params.id),
                }
    }
    );
      if (!employee) {
        return res.status(404).json({ error: 'employee not found' });
      }

      await employeeRepository.remove(employee);
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};