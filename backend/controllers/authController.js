const User = require("../models/User");
// import { models } from './../node_modules/mongoose/types/index.d';
// import { tokenCache } from './../node_modules/mongodb/src/client-side-encryption/providers/azure';
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.registerUser = async(req,res) => {
    const { fullName,email,password , profileImageUrl} = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        });

        res.status(201).json({
            id:user._id,
            user,
            token: generateToken(user._id),
            });
        }catch(err){
            res
            .status(500)
            .json({message : "Error Registering User", error: err.message});
        }
    
};

exports.loginUser = async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    try{
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(200).json({
            id:user._id,
            user,
            token: generateToken(user._id),
        });
    } catch(err){
        res
        .status(500)
        .json({message : "Error Logging In User", error: err.message});
    }
};

exports.getUserInfo = async(req,res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json(user);
        } catch(err){
            res
            .status(500)
            .json({message : "Error Getting User Info", error: err.message});
        }
};
