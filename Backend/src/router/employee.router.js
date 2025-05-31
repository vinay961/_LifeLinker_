import {Router} from 'express';
import { createEmployee,getAllEmployees,getEmployeeById } from '../controller/employee.controller.js';

const employeeRouter = Router();

employeeRouter.post('/createEmployee', createEmployee);
employeeRouter.get('/allEmployee', getAllEmployees);
employeeRouter.get('/:id', getEmployeeById);

export default employeeRouter;