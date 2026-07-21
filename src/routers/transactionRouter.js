import express from "express";
import addIncome from "../controllers/features/transactions/addIncomeController.js";
import retrieveCurrentMonthIncomeInfo from "../controllers/features/transactions/retrieveCurrentMonthIncomeInfo.js";
import retrievePreviousMonthIncomeInfo from "../controllers/features/transactions/previousMonthIncomeInfo.js";

const transactionRouter = express.Router();

// GET API routes for transactions
transactionRouter.get("/retrieveThisMonthIncome", retrieveCurrentMonthIncomeInfo);
transactionRouter.get("/retrievePreviousMonthIncome", retrievePreviousMonthIncomeInfo);

// POST API routes for transactions
transactionRouter.post("/addIncome", addIncome);

export default transactionRouter;