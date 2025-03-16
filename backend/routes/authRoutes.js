const express = require("express");
const {protect} = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController");

const router = express.Router();

// Register User
router.post("/register", registerUser);
// Login User
router.post("/login", loginUser);
// Get User Info
router.get("/getUser",protect,getUserInfo);


router.post("/upload-image" , upload.single("image"), (req,res) => {
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({imageUrl}); 
});

module.exports=router;