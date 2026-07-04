import express from 'express';
import registerUser from '../controllers/features/auth/registerUserController.js'
import logIn from '../controllers/features/auth/loginController.js';
import verifyToken from '../controllers/features/auth/verifyTokenController.js';

const router = express.Router();

//GET method routes for authentication
router.get("/verifyToken", verifyToken)

// POST method routes for authentication
router.post("/registerUser", registerUser)
router.post("/login", logIn)