import express from "express";
import addIncome from "../controllers/features/transactions/income/addIncomeController.js";
import registerUser from "../controllers/features/auth/registerUserController.js";
import retrieveIncomeInfo from "../controllers/features/transactions/income/retrieveIncomeInfo.js";
import retrieveExpenseInfo from "../controllers/features/transactions/expense/retrieveExpenseInfo.js";
import addExpense from "../controllers/features/transactions/expense/addExpenseController.js";
import deleteExpense from "../controllers/features/transactions/expense/deleteExpenseInfo.js";
import deleteIncome from "../controllers/features/transactions/income/deleteIncomeInfo.js";

const transactionRouter = express.Router();

// GET API routes for transactions
transactionRouter.get("/retrieveIncomeInfo", retrieveIncomeInfo);
transactionRouter.get("/retrieveExpenseInfo", retrieveExpenseInfo)

// POST API routes for transactions
transactionRouter.post("/addIncome", addIncome);
transactionRouter.post('/addExpense', addExpense)
transactionRouter.post('/deleteExpense', deleteExpense);
transactionRouter.post('/deleteIncome', deleteIncome);

export default transactionRouter;