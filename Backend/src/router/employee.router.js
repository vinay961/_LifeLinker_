import {Router} from 'express';
import { createEmployee,getAllEmployees,getEmployeeById } from '../controller/employee.controller.js';
import { verifyJWT } from '../middleware/checkAuth.js';
import { upload } from '../middleware/multer.js';

const employeeRouter = Router();

employeeRouter.post('/createEmployee', verifyJWT, upload.single("image"), createEmployee);
employeeRouter.get('/allEmployee', verifyJWT, getAllEmployees);
employeeRouter.get('/:id', getEmployeeById);

export default employeeRouter;