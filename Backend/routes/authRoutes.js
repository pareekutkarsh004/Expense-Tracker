import express from 'express'
import { requireAuth } from '@clerk/express'


// get router functionality from express
const router = express.Router();

//Public route 
router.get("/public",(req,res) => {
    res.json({message: "Anyone can acces this"});
});

//Protected route 
router.get("/profile", requireAuth(), (req,res) => {
    res.json({message: "This is a protected route", userId: req.auth.userId});
});

export default router; 