import express from 'express';
import registerUser from '../controllers/features/auth/registerUserController.js'
import logIn from '../controllers/features/auth/loginController.js';
import verifyToken from '../controllers/features/auth/verifyTokenController.js';

const authRouter = express.Router();

//GET method routes for authentication
authRouter.get("/verifyToken", verifyToken)

// POST method routes for authentication
authRouter.post("/registerUser", registerUser)
authRouter.post("/login", logIn)

export default authRouter