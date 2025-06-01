import {Router} from 'express';
import { createEmployee,getAllEmployees,getEmployeeById,editEmployee,deleteEmployee } from '../controller/employee.controller.js';
import { verifyJWT } from '../middleware/checkAuth.js';
import { upload } from '../middleware/multer.js';

const employeeRouter = Router();

employeeRouter.post('/createEmployee', verifyJWT, upload.single("image"), createEmployee);
employeeRouter.get('/allEmployee', verifyJWT, getAllEmployees);
employeeRouter.get('/getEmployee/:id', getEmployeeById);
employeeRouter.put('/editEmployee/:id', verifyJWT, upload.single("image"), editEmployee);
employeeRouter.delete('/deleteEmployee/:id', verifyJWT, deleteEmployee);

export default employeeRouter;