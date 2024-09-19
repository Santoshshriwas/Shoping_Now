const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt");
const validator = require("validator");
const userModel = require("../Models/UserModel")

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
// const registerUser = async (req,res) => {
//     const {name, email, password} = req.body;
//     try{
//         //check if user already exists
//         const exists = await userModel.findOne({email})
//         if(exists){
//             return res.json({success:false,message: "User already exists"})
//         }

//         // validating email format & strong password
//         if(!validator.isEmail(email)){
//             return res.json({success:false,message: "Please enter a valid email"})
//         }
//         if(password.length<8){
//             return res.json({success:false,message: "Please enter a strong password"})
//         }

//         // hashing user password
//         const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUser = new userModel({name, email, password: hashedPassword})
//         const user = await newUser.save()
//         const token = createToken(user._id)
//         res.json({success:true,token})

//     } catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        // Hash the user password
        if (typeof password !== 'string') {
            throw new Error('Password must be a string');
        }

        const salt = await bcrypt.genSalt(10);
        if (typeof salt !== 'string') {
            throw new Error('Salt must be a string');
        }

        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        // Create a token for the new user
        const token = createToken(user._id);
        
        // Respond with success
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error('Error in registerUser:', error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};



const alluser= async(req,res)=>{
    try{
        // console.log("userid all Users",req.userId)

        const allUsers = await userModel.find()
        res.json({
            message : "All User ",
            data : allUsers,
            success : true,
            error : false
        })
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports= {loginUser, registerUser ,alluser}


