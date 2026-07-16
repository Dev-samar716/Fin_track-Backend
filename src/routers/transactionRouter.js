import express from "express";
import addIncome from "../controllers/features/transactions/addIncomeController";
import retrieveCurrentMonthIncomeInfo from "../controllers/features/transactions/retrieveCurrentMonthIncomeInfo";

const transactionRouter = express.Router();

// GET API routes for transactions
transactionRouter.get("/retrieveThisMonthIncome", retrieveCurrentMonthIncomeInfo);

// POST API routes for transactions
transactionRouter.post("/addIncome", addIncome);

export default transactionRouter;