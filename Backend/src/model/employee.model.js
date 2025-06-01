import mongoose,{Schema} from 'mongoose';

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    designation: {
        type: String,
        required: true,
        enum: ['Manager', 'Developer', 'Designer', 'Tester', 'HR', 'Sales']
    },
    gender: {
        type: String,
        required: true,
    },
    courses: {
        type: [String],
        required: true,
    },
    image: {
        type: String,
        required: true
    }
},{timestamps: true});


export const Employee = mongoose.model('Employee', employeeSchema); 