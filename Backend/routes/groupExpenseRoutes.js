import express from 'express';
import { clerkMiddleware } from '@clerk/express';
import { createGroup, getGroups, updateGroup, deleteGroup } from '../controllers/groupExpenseController.js';

const router = express.Router();

router.use(clerkMiddleware());

router.route('/')
    .post(createGroup)
    .get(getGroups);

router.route('/:id')
    .put(updateGroup)
    .delete(deleteGroup);

export default router;