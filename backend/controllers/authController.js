const userModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// signup
const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this Email Id, You can login'
            });
        }
        const newUser = new userModel({ userName, email, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'Register Successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'Invalid Candidate'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid passowrd"
            });
        }
        // const token= generateToken(user._id)
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.userName
            },
            process.env.JWT_SECRET,
            { expiresIn: '720h' } // 30 days
        );
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.userName,
                email: user.email
            }
        });
    }
     catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

module.exports ={
    signup,
    login
}