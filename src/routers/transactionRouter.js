import express from "express";
import addIncome from "../controllers/features/transactions/addIncomeController.js";
import registerUser from "../controllers/features/auth/registerUserController.js";
import retrieveIncomeInfo from "../controllers/features/transactions/retrieveIncomeInfo.js";

const transactionRouter = express.Router();

// GET API routes for transactions
transactionRouter.get("/retrieveIncomeInfo", retrieveIncomeInfo);

// POST API routes for transactions
transactionRouter.post("/addIncome", addIncome);

export default transactionRouter;