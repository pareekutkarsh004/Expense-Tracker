import { getAuth } from '@clerk/express';
import Group from '../models/GroupExpense.model.js';
import User from '../models/User.model.js';

// @desc    Create a new group
// @route   POST /api/groups
export const createGroup = async (req, res) => {
    try {
        const { userId: clerkUserId } = getAuth(req);
        if (!clerkUserId) return res.status(401).json({ message: 'Unauthorized' });

        const user = await User.findOne({ clerkUserId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Destructure the new field
        const { name, customExpense } = req.body; 
        
        const newGroup = await Group.create({
            name,
            members: [user._id],
            owner: user._id,
            customExpense // Use the new field here
        });

        res.status(201).json(newGroup);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all groups for the authenticated user
// @route   GET /api/groups
export const getGroups = async (req, res) => {
    try {
        const { userId: clerkUserId } = getAuth(req);
        if (!clerkUserId) return res.status(401).json({ message: 'Unauthorized' });

        const user = await User.findOne({ clerkUserId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Populate the 'members' field to get their email
        const groups = await Group.find({ members: user._id }).populate('members', 'email');
        res.status(200).json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update a group
// @route   PUT /api/groups/:id
export const updateGroup = async (req, res) => {
    try {
        const { userId: clerkUserId } = getAuth(req);
        if (!clerkUserId) return res.status(401).json({ message: 'Unauthorized' });

        const user = await User.findOne({ clerkUserId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        // Security check: only the owner can update the group
        if (group.owner.toString() !== user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this group' });
        }

        const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedGroup);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// @desc    Delete a group
// @route   DELETE /api/groups/:id
export const deleteGroup = async (req, res) => {
    try {
        const { userId: clerkUserId } = getAuth(req);
        if (!clerkUserId) return res.status(401).json({ message: 'Unauthorized' });

        const user = await User.findOne({ clerkUserId });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const group = await Group.findById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Group not found' });
        
        // Security check: only the owner can delete the group
        if (group.owner.toString() !== user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this group' });
        }

        await Group.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Group removed' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};