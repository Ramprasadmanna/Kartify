import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'UserModel',
    },
    name: {
      type: String,
      required: [true, 'User name is required'],
    },
    rating: {
      type: Number,
      required: [true, 'Review rating is required'],
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User Id Is Required'],
    ref: 'UserModel'
  },
  name: {
    type: String,
    required: [true, 'Product Name Id Is Required'],
  },
  price: {
    type: Number,
    required: [true, 'Product Price is Required'],
  },
  description: {
    type: String,
    required: [true, 'Product Description is Required'],
  },
  image: {
    type: String,
    required: [true, 'Product Image is Required'],
  },
  category: {
    type: String,
    required: [true, 'Product Category is Required'],
  },
  brand: {
    type: String,
    required: [true, 'Product Brand is Required'],
  },
  countInStock: {
    type: Number,
    required: [true, 'Product Count In Stock is Required'],
  },
  rating: {
    type: Number,
    required: [true, 'Product rating is Required'],
  },
  numReviews: {
    type: Number,
    required: [true, 'Product review count is Required'],
  },
  content: {
    type: String,
    required: [true, 'Product content is Required'],
  },
  reviews: [reviewSchema],
  publish: {
    type: Boolean,
    default: false
  },
},
  {
    timestamps: true,
    collection: 'products'
  }
);

const ProductModel = mongoose.model("ProductModel", productSchema)
export default ProductModel;

