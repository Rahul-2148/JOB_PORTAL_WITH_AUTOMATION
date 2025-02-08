import express from 'express';
import { getUser, login, logout, register, updatePassword, updateProfile } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Register user route
router.post('/register', register);

// Login user route
router.post('/login', login);

// Logout user route
router.get('/logout', isAuthenticated, logout);

// Get user profile route
router.get('/profile', isAuthenticated, getUser);

// Update user profile route
router.put('/profile/update', isAuthenticated, updateProfile);

// Update password route
router.put('/update/password', isAuthenticated, updatePassword);

export default router;