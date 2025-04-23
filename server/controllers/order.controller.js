import OrderModel from "#models/order.model.js";
import crypto from 'crypto'

import { razorPayInstance } from "#config/razorpay.config.js";
import mongoose from "mongoose";
import mailSend from "#utils/mailSender.js";

/**
 * @desc		Create new order
 * @route		POST /api/v1/orders
 * @access	private
 */
const createOrder = async (req, res) => {

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(404);
    throw new Error('No Order Items');
  } else {
    const order = new OrderModel({
      user: req.user._id,
      orderItems: orderItems.map((item) => (
        {
          ...item,
          product: { ...item },
        })),
      shippingAddress,
      itemsPrice,
      paymentMethod,
      shippingPrice,
      taxPrice,
      totalPrice,

    })

    const createdOrder = await order.save();
    res.status(200).json(createdOrder);
  }
};


/**
 * @desc		Create Razorpay order
 * @route		POST /api/v1/create-razorpay-order
 * @access	private
 */
const createRazorPayOrder = async (req, res) => {
  const {
    amount,
    orderId
  } = req.body;

  var options = {
    amount: amount * 100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: orderId
  };

  try {
    const orderDetails = await razorPayInstance.orders.create(options);
    res.status(200).json(orderDetails);
  } catch (err) {
    res.status(401);
    throw new Error(err);
  }
};

const verifyRazorPaySignature = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  const paymentDetails = await razorPayInstance.payments.fetch(paymentId);

  if (expectedSignature === signature) {
    res.status(202).json({ status: "success", paymentDetails });
  } else {
    res.status(400);
    throw new Error("Signature verification failed");
  }
}

/**
 * @desc		Get Logged in User order
 * @route		POST /api/v1/orders/my-orders
 * @access	private
 */
const getMyOrders = async (req, res) => {
  const order = await OrderModel.find({ user: req.user._id });
  res.status(200).json(order);

};

/**
 * @desc		Get order by id
 * @route		POST /api/v1/orders/:id
 * @access	private
 */
const getOrderById = async (req, res) => {
  // const order = await OrderModel.findById(req.params.id).populate('user', 'name email');
  const details = req.user.isAdmin
    ? { _id: req.params.id }
    : { _id: req.params.id, user: req.user._id }


  const order = await OrderModel.findOne({ ...details }).populate('user', 'name email')

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
};

/**
 * @desc		Update Order To Paid
 * @route		POST /api/v1/orders/:id/pay
 * @access	private
 */
const updateOrderToPaid = async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate('user', 'name email');

  if (order) {

    if (req.body.paymentMethod === "paypal") {
      order.isPaid = true;
      order.PaidAt = Date.now();
      order.paymentResult.paypal = {
        ...req.body,
        payer: {
          ...req.body.payer,
          name: { ...req.body.payer.name }
        }
      }

      const updatedOrder = await order.save();
      mailSend('order', order);
      res.status(200).json(updatedOrder);
    } else if (req.body.paymentMethod === "razorpay") {
      order.isPaid = true;
      order.PaidAt = Date.now();

      const paymentMethod = req.body.paymentDetails.method;

      if (paymentMethod === "upi") {
        order.paymentResult.razorpay = {
          status: req.body.status,
          paymentMode: req.body.paymentDetails.method,
          paymentId: req.body.paymentDetails.id,
          email: req.body.paymentDetails.email,
          paymentDate: req.body.paymentDetails.created_at,

          // For UPI
          upiId: req.body.paymentDetails?.upi?.vpa,
          upiTransationId: req.body.paymentDetails.acquirer_data?.upi_transaction_id,

        }
      } else if (paymentMethod === "netbanking") {
        order.paymentResult.razorpay = {
          status: req.body.status,
          paymentMode: req.body.paymentDetails.method,
          paymentId: req.body.paymentDetails.id,
          email: req.body.paymentDetails.email,
          paymentDate: req.body.paymentDetails.created_at,

          // For NETBANKING
          bankName: req.body.paymentDetails?.bank,
          bankTransationId: req.body.paymentDetails.acquirer_data?.bank_transaction_id,
        }
      } else if (paymentMethod === "card") {
        order.paymentResult.razorpay = {
          status: req.body.status,
          paymentMode: req.body.paymentDetails.method,
          paymentId: req.body.paymentDetails.id,
          email: req.body.paymentDetails.email,
          paymentDate: req.body.paymentDetails.created_at,

          // For CARD PAYMENT
          cardType: req.body.paymentDetails?.card?.type,
          cardEndingWith: req.body.paymentDetails?.card?.last4,
          cardNetwork: req.body.paymentDetails?.card?.network,
        }
      } else if (paymentMethod === "wallet") {
        order.paymentResult.razorpay = {
          status: req.body.status,
          paymentMode: req.body.paymentDetails.method,
          paymentId: req.body.paymentDetails.id,
          email: req.body.paymentDetails.email,
          paymentDate: req.body.paymentDetails.created_at,

          // FOR WALLET
          wallet: req.body.paymentDetails.wallet,
        }
      }

      const updatedOrder = await order.save();
      mailSend('order', order);
      res.status(200).json(updatedOrder);
    }


  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
};

/**
 * @desc		Update Order To Deliver
 * @route		POST /api/v1/orders/:id/deliver
 * @access	private
 */
const updateOrderToDelivered = async (req, res) => {
  const order = await OrderModel.findById(req.params.id).populate('user', 'name email');;

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    mailSend('delivered', order.toObject());

    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order Not Found');
  }
};

/**
 * @desc		Create new order
 * @route		POST /api/v1/orders
 * @access	private/admin
 */
const getOrders = async (req, res) => {
  const pageSize = +req.query.pageSize || 5;
  const page = +req.query.pageNumber || 1;

  const searchCondition = mongoose.Types.ObjectId.isValid(req.query.keyword)
    ? [
      { _id: req.query.keyword },
      { user: req.query.keyword },
    ]
    : [
      { paymentMethod: { $regex: req.query.keyword, $options: 'i' } },
    ]

  const keyword = req.query.keyword
    ? {
      $or: [
        ...searchCondition
      ]
    }
    : {}

  const orders = await OrderModel.find({ ...keyword })
    .populate('user', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  const count = await OrderModel.countDocuments({ ...keyword });

  res.status(200).json({ orders, page, pageSize, pages: Math.ceil(count / pageSize) });
};

export {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  createRazorPayOrder,
  verifyRazorPaySignature
};