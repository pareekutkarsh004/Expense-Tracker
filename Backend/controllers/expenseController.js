import Expense from '../models/Expense.model.js';
import User from '../models/User.model.js';
import { getAuth } from '@clerk/express';

// @desc    Add a new expense for the authenticated user
// @route   POST /api/expenses
// ...
export const addExpense = async (req, res) => {
    try {
        // We are bypassing Clerk for testing purposes
        const { userId: clerkUserId } = getAuth(req);
        // const clerkUserId = 'test_user_1'; // Use a hardcoded ID for now
        
        console.log("clerk ID", clerkUserId);
        if (!clerkUserId) {
            return res.status(401).json({ message: "Unauthorized User!!" });
        }
        

    
    const user = await User.findOne({ clerkUserId });

    console.log("Result of User Query:", user); // This will show you if a user was found
    
    if (!user) {
        return res.status(404).json({ message: "User Not Found!!" });
    }
        
        const { text, category, amount, isGroupExpense, groupId } = req.body;
        
        const newExpense = await Expense.create({
            userId: user._id,
            text,
            category,
            amount,
            isGroupExpense,
            groupId
        });

        res.status(201).json(newExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get all expenses for the authenticated user
// @route   GET /api/expenses
export const getExpenses = async(req,res)=>{
try {
    const{userId : clerkUserId} = getAuth(req);

    if(!clerkUserId){
        return res.status(401).json({message:"Unauthorized User"})
    }

    const user = await User.findOne({ clerkUserId }); // Corrected: added 'await' and query object

    if (!user) {
            return res.status(404).json({ message: 'User Not Found!!' });
        }
    // but if we got the user just fetch the details of expenses
    // We have to get all the expenses realated to the user who have logged in 
    // so we cannot use findById in this case cause many Expenses are related 
    // to this user if he has added more than one so we will use find 
    const expenses = await Expense.find({ userId: user._id }).sort({ createdAt: -1 }); // Corrected: sort by createdAt
    // so expenses will now contain all expenses created by this user who is logged in 
    // ans sort({date:-1}) means it will sort all the expenses by descending order 
    // of dates means the newest one .....
    res.status(200).json(expenses);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
}
};

// @desc    Update an expense
// @route   PUT /api/expenses/:id
export const updateExpense = async (req, res) => {
try {
    const { userId: clerkUserId } = getAuth(req);
    if (!clerkUserId) {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
    const expense = await Expense.findById(req.params.id);
    // id will be mounted in route only (: id)

    if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
    }
    // if we found expense 
    const user = await User.findOne({ clerkUserId });
    // Security check: Make sure the found expense belongs to the authenticated user
    if (expense.userId.toString() !== user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this expense' });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedExpense);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
};

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
export const deleteExpense = async (req, res) => {
    try {
        const { userId: clerkUserId } = getAuth(req);

        if (!clerkUserId) {
            return res.status(401).json({ message: 'Unauthorized User' });
        }

        const expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const user = await User.findOne({ clerkUserId });

        // Security check: Make sure the found expense belongs to the authenticated user
        if (expense.userId.toString() !== user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this expense' });
        }
        
        await Expense.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'Expense removed' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};