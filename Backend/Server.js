console.log("nodeMon is watching ");
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; // Make sure this is at the top to load env vars
import connectDB from './database/db.js';
import expenseRoutes from './routes/expenseRoutes.js'; // Import the expense router
import { clerkMiddleware, getAuth } from '@clerk/express'; // Add this import
import groupExpenseRoutes from './routes/groupExpenseRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // This should be at top cause we want that db should be ready to 
// listen our request as soon as server starts 

app.use(cors()); // it allows other origin to connect to website 
app.use(express.json()); // it parses the express stream data into js objects without this req.body and all have no meaning 

app.use(clerkMiddleware()); 



// Use the expense router for all API requests
app.use('/api/expenses', expenseRoutes);
app.use('/api/groups', groupExpenseRoutes); 

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})