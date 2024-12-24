import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User Id Is Required"],
      ref: "UserModel",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "ProductModel",
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method Required"],
    },
    paymentResult: {
      paypal: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String },
        payer: {
          email_address: { type: String },
          name: {
            given_name: { type: String },
            surname: { type: String }
          },
          payer_id: { type: String }
        },
      },
      razorpay: {
        status: { type: String },
        paymentMode: { type: String },
        paymentId: { type: String },
        email: { type: String },
        paymentDate: { type: String },
        upiId: { type: String },
        upiTransationId: { type: String },
        bankName: { type: String },
        bankTransationId: { type: String },
        cardType: { type: String },
        cardEndingWith: { type: String },
        cardNetwork: { type: String },
        wallet: { type: String },
      }
    },
    itemsPrice: {
      type: Number,
      required: [true, "Items price is required"],
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: [true, "Tax price is required"],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, "Shipping price is required"],
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: [true, "Payment status is required"],
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      default: false,
      required: [true, "Delivery status is required"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);


const OrderModel = mongoose.model('OrderModel', orderSchema)
export default OrderModel
