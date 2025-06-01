import { Employee } from "../model/employee.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createEmployee = async (req,res) => {
    try {
        const { name, email, mobile, designation, gender } = req.body;
        const courses = JSON.parse(req.body.courses);


        if([name,email,mobile,designation,gender].some(field => !field)) {
            return res.status(400).json({message: "All fields are required"});
        }
        const localFilePath = req.file ? req.file.path : null;
        console.log("Local file path:", localFilePath); // Debugging line to check the file path
        if (!localFilePath) {
            return res.status(400).json({message: "Image is required"});
        }
        const employeeImage = await uploadOnCloudinary(localFilePath);
        if (!employeeImage) {
            return res.status(500).json({message: "Image upload failed"});
        }

        const newEmployee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            courses,
            image: employeeImage.url,
        });
        await newEmployee.save();
        res.status(201).json({message: "Employee created successfully", employee: newEmployee});

    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({message: "Employees fetched successfully", employees});
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({message: "Employee not found"});
        }
        res.status(200).json({message: "Employee fetched successfully", employee});
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export {
    createEmployee,
    getAllEmployees,
    getEmployeeById
}
