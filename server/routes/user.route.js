import express from 'express'

import {
  deleteUser,
  getUserById,
  getUserProfile,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
  enableUser,
  disableUser,
  sendOtp,
  verifyOtp,
} from "#controllers/user.controller.js";
import { protect, admin } from '#middlewares/auth.middleware.js';


const router = express.Router();

// User Routes
router.route('/').post(registerUser)
router.route('/otp').post(sendOtp);
router.route('/verifyOtp').post(verifyOtp);
router.route('/login').post(loginUser)
router.route('/logout').post(protect, logoutUser)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

// Admin Routes
router.route('/').get(protect, admin, getUser)
router.route('/:id')
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser)
router.route('/:id/activate').post(protect, admin, enableUser);
router.route('/:id/deactivate').post(protect, admin, disableUser);

export default router;





