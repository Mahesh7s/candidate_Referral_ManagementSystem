const express =require("express");
const { register, login } = require("../controllers/userControler");
const {body} = require("express-validator");

const userRouter = express.Router();
userRouter.post("/register",[body("email").isEmail().withMessage("Enter a valid Email")],register);
userRouter.post("/login",[body("email").isEmail().withMessage("Enter a valid Email")],login)



module.exports = userRouter;