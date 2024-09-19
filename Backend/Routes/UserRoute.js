const express = require("express");

const { loginUser,registerUser ,alluser} = require("../Controllers/UserController");
const  userRouter = express.Router()

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/user",alluser);

module.exports=userRouter;