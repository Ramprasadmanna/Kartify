import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from '#config/db.config.js'
import products from '#data/products.js'
import users from '#data/users.data.js'
import userModel from '#models/user.model.js'
import ProductModel from '#models/product.model.js'
import OrderModel from '#models/order.model.js'


dotenv.config();
connectDB();

const importData = async () => {
  try {
    await userModel.deleteMany();
    await ProductModel.deleteMany();
    await OrderModel.deleteMany();

    const createdUser = await userModel.insertMany(users);
    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => ({ ...product, user: adminUser }))

    await ProductModel.insertMany(sampleProducts);

    console.log('Data imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse.underline);
    process.exit(1);
  }
}


const destroyData = async () => {
  try {
    await userModel.deleteMany();
    await ProductModel.deleteMany();
    await OrderModel.deleteMany();

    console.log('Data destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.inverse.underline);
    process.exit(1)
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}