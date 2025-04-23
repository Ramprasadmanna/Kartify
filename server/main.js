import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import colors from "colors";
import path from "path";

import connectDB from "#config/db.config.js";
import productRoutes from "#routes/product.route.js";
import userRoutes from "#routes/user.route.js";
import orderRoutes from "#routes/order.route.js";
import uploadRoutes from "#routes/upload.route.js";
import { errorHandler } from "#middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json()); // Request body parsing
app.use(express.urlencoded({ extended: true })); // Form data parsing
app.use(cookieParser()); // Parse cookies
app.use(morgan("dev"));

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);

app.get("/api/v1/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.get("/api/v1/config/razorpay", (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use(express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get(/.*/, (req, res) => {
    console.log("im hit");
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${port}`.green.bold
  );
});
