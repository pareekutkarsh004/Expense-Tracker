import express from 'express';
import { clerkMiddleware,getAuth } from '@clerk/express';
import Expense from '../models/Expense.model.js';
import User from '../models/User.model.js';
import { getExpenses,addExpense,updateExpense,deleteExpense } from '../controllers/expenseController.js';

const router = express.Router();

// router.use(clerkMiddleware());

router.route('/')
    .get(getExpenses)
    .post(addExpense);

router.route('/:id')
    .put(updateExpense)
    .delete(deleteExpense);

export default router;