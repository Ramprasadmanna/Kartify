import ProductModel from "#models/product.model.js";
import OrderModel from "#models/order.model.js";
import mongoose from "mongoose";

/**
 * @desc		Fetch all Published products
 * @route		GET /api/products
 * @access	public
 */
const getPublishedProducts = async (req, res) => {
  const pageSize = +req.query.pageSize || 4;
  const page = +req.query.pageNumber || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {}

  const products = await ProductModel.find({ publish: true, ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const count = await ProductModel.countDocuments({ publish: true, ...keyword });



  if (products) {
    res.json({ products, page, pageSize, pages: Math.ceil(count / pageSize) })
  } else {
    res.status(404)
    throw new Error('Products Not Found');
  }
};


/**
 * @desc		Fetch all Published and UnPublished products
 * @route		GET /api/allProducts
 * @access	private/admin
 */
const getAllProducts = async (req, res) => {
  const pageSize = +req.query.pageSize || 5;
  const page = +req.query.pageNumber || 1;

  const searchCondition = mongoose.Types.ObjectId.isValid(req.query.keyword)
    ? [{ _id: req.query.keyword }]
    : [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { brand: { $regex: req.query.keyword, $options: 'i' } }
    ]



  const keyword = req.query.keyword
    ? {
      $or: [
        ...searchCondition
      ]
    }
    : {}

  const products = await ProductModel.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const count = await ProductModel.countDocuments({ ...keyword });

  if (products) {
    res.json({ products, page, pageSize, pages: Math.ceil(count / pageSize) })
  } else {
    res.status(404)
    throw new Error('Products Not Found');
  }
};

/**
 * @desc		Fetch product by id
 * @route		GET /api/products/publish/:id
 * @access	public
 */

const getPublishProductById = async (req, res) => {
  const product = await ProductModel.findOne({ _id: req.params.id, publish: true });
  if (product) {
    res.json(product);
  } else {
    res.status(404)
    throw new Error('Product Not Found');
  }
};

/**
 * @desc		Fetch product by id
 * @route		GET /api/products/:id
 * @access	private/admin
 */

const getProductById = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404)
    throw new Error('Product Not Found');
  }
};

/**
 * @desc		Fetch Cart Products Through Array
 * @route		GET /api/products/cart
 * @access	public
 */

const getCartProducts = async (req, res) => {
  const itemIds = req.body;

  const products = await ProductModel.find({ _id: { $in: itemIds }, publish: true });
  if (products) {
    res.json(products);
  } else {
    res.status(404)
    throw new Error('Product Not Found');
  }
}

/**
 * @desc		Create Product
 * @route		POST /api/v1/products
 * @access	private/admin
 */

const createProduct = async (req, res) => {
  const product = new ProductModel({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: 'https://dummyimage.com/4:5x1080&text=Sample-Image-Upload-New-Image',
    brand: 'Sample brand',
    category: 'Sample category',
    rating: 0.0,
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
    content: 'Sample content',
  })

  const createdProduct = await product.save();
  res.status(200).json(createdProduct);
}

/**
 * @desc		Publish Product
 * @route		POST /api/v1/products/:id/publish
 * @access	private/admin
 */

const publishProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (product) {
    product.publish = true;
    const unPublishedProduct = await product.save();
    res.status(200).json(unPublishedProduct);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
}

/**
 * @desc		UnPublish Product
 * @route		POST /api/v1/products/:id/unPublish
 * @access	private/admin
 */

const unPublishProduct = async (req, res) => {

  const product = await ProductModel.findById(req.params.id);


  if (product) {
    product.publish = false;
    const unPublishedProduct = await product.save();
    res.status(200).json(unPublishedProduct);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
}


/**
 * @desc		Update Product
 * @route		PUT /api/v1/products/:id
 * @access	private/admin
 */
const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    content,
    publish
  } = req.body;

  const product = await ProductModel.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.content = content;
    product.publish = publish;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error('Product Not Found.')
  }
};

/**
 * @desc		Delete Product
 * @route		DELETE /api/v1/products/:id
 * @access	private/admin
 */
const deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (product) {
    await ProductModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Product Deleted' });
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
}

/**
 * @desc		Create Product Review
 * @route		DELETE /api/v1/products/:id/reviews
 * @access	private/admin
 */
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;

  const product = await ProductModel.findById(req.params.id);

  if (product) {

    const orders = await OrderModel.find({ user: req.user._id });

    if (orders.length) {
      const isPurchased = orders.some((order) => order.orderItems.some((orderList) => orderList.product.toString() === req.params.id));

      if (isPurchased) {
        const alreadyReviewed = product.reviews.find(
          (review) => review.user._id.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
          res.status(404);
          throw new Error('Product Already Reviewed');
        }

        const review = {
          user: req.user._id,
          name: req.user.name,
          rating: +rating,
          comment
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((acc, curVal) => curVal.rating + acc, 0)
          / product.reviews.length;

        await product.save();
        res.status(201).json({ message: 'Review Added' });

      } else {
        res.status(404);
        throw new Error("Sorry! You are not allowed to review this product since you haven't bought it");
      }

    } else {
      res.status(404);
      throw new Error("Sorry! You are not allowed to review this product since you haven't bought it");
    }
  } else {
    res.status(404);
    throw new Error('Product not found');
  }

}



export {
  getPublishedProducts,
  getAllProducts,
  getPublishProductById,
  getProductById,
  getCartProducts,
  createProduct,
  publishProduct,
  unPublishProduct,
  updateProduct,
  deleteProduct,
  createProductReview
}
