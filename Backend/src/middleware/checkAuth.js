import jwt from 'jsonwebtoken'; 
import {User} from '../model/user.model.js';

export const verifyJWT = async (req, res, next) => {
    // console.log("Entering verifyJWT middleware"); for debugging
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id);
        // console.log(user); for debugging
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        // console.log(`User ${user.email} authenticated successfully`); for debugging
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Invalid token' });
    }
}