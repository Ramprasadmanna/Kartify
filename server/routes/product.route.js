import express from 'express'


import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCartProducts,
  getProductById,
  getPublishedProducts,
  getPublishProductById,
  publishProduct,
  unPublishProduct,
  updateProduct,
  createProductReview
} from '#controllers/product.controller.js';
import { admin, protect } from '#middlewares/auth.middleware.js';


const router = express.Router();

// User Route
router.route('/publish').get(getPublishedProducts);
router.route('/cart').post(getCartProducts);
router.route('/publish/:id').get(getPublishProductById);
router.route('/:id/review').post(protect, createProductReview);

// Admin Route
router.route('/').get(protect, admin, getAllProducts);
router.route('/').post(protect, admin, createProduct);
router.route('/:id').get(protect, admin, getProductById);
router.route('/:id').delete(protect, admin, deleteProduct);
router.route('/:id/publish').put(protect, admin, publishProduct);
router.route('/:id/unPublish').put(protect, admin, unPublishProduct);
router.route('/:id').put(protect, admin, updateProduct);

export default router;