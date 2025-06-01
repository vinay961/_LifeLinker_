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
        enum: ['Manager', 'Developer', 'Designer', 'Tester']
    },
    gender: {
        type: String,
        required: true,
    },
    course: {
        type: [String],
        required: true,
        enum: ['JavaScript', 'Python', 'Java', 'C++']
    },
    image: {
        type: String,
        required: true
    }
},{timestamps: true});


export const Employee = mongoose.model('Employee', employeeSchema); 