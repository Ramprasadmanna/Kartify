import jwt from "jsonwebtoken"
import userModel from "#models/user.model.js"

// const protect = async (req, res, next) => {
//   let token = req.cookies.jwt;

//   if (token) {
//     try {
//       const decode = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await userModel.findById(decode.id).select('-password');
//       next();
//     } catch (error) {
//       console.error(error);
//       res.status(401);
//       throw new Error('Not authorized, token failed');
//     }
//   } else {
//     res.status(401);
//     throw new Error('Not authorized, token failed');
//   }
// }

const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decode.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    // throw new Error('Not authorized, token failed');
    throw new Error('Session Expired');
  }
}


const admin = (req, res, next) => {

  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin");
  }
}

export { protect, admin }