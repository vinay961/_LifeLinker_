import mongoose,{Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

// Hash password before saving
employeeSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Password comparison method
userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password,this.password)
}

export const Employee = mongoose.model('Employee', employeeSchema); 