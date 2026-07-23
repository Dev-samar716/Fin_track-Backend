import express from 'express';
import getUserCurrency from '../controllers/getUserCurrency.js';
import addCurrency from '../controllers/addCurrency.js';

const currencyRouter = express.Router();

// GET API route for currencyRouter
currencyRouter.get('/getUserCurrency/:user_id', getUserCurrency);

// POST API route for currencyRouter
currencyRouter.post('/addCurrency', addCurrency);

export default currencyRouter;