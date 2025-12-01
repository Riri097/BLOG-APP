const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// bcrypt to hash passwords to read 
// JWT to create a digital ID card for user after login/signup

// Signup controller
const signup = async (req, res) => {
    try {
        // get details of user from body
        const {name, email, password} = req.body;

        // checks if user exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        // hash password (encrypt it)
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = await User.create({
            name, email, password: hashedPassword,
        })

        // create JWT token or digital ID card for user after signup
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        // send response
        res.status(201).json({
            message: "User created successfully",
            token, 
            user:{id: user._id, name: user.name, email: user.email,}
        });
    }catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });

    }
};

// Login controller
const login = async (req, res) => {
    try {
        // get email and password from body
        const {email, password} = req.body;

        // find user by email
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message: 'Invalid credentials'})
        }

        // compare password with hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // create JWT token or digital ID card for user after login
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );
         
        res.json({
            message: 'Login successful',
            token,
            user: {id: user._id, name: user.name, email: user.email,},
        });
    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
};

// Get logged in user info
const getMe = async (req, res) => {
    try {
        // req.userId comes from userMiddleware after token verification
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    }catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

// Update User Account
const updateAccount = async (req, res) => {
   try{
    const {name, email} = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        {name, email},
        {new: true}      //to return updated document 
    ). select('-password');

    res.json({
        message: ' Account Updated Successfully',
        user: updatedUser,
    })

   }catch(error){
    req.status(500).json({message: 'Server error', error:error.message});
   }
};

// Delete User Account
const deleteAccount = async (req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.userId);

        if (!deleteUser){
            return res.status(404).json({message:'User not found'});
        }

        res.json({message: 'Account deleted successfully'});


    }catch(error){
        req.status(500).json({message: 'Server error', error: error.message})
    }
};

module.exports = { signup, login, getMe, updateAccount, deleteAccount };