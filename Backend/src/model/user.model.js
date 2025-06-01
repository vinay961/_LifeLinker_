import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    token: {
        type: String,
        default: null
    }
},{timestamps: true});

// Hashing password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Password comparison method 
userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password,this.password)
}

// Generate JWT token
userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'1h'
        }
    )
}

export const User = mongoose.model('User', userSchema);