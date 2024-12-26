import userModel from "#models/user.model.js";
import generateToken from "#utils/generate-token.utils.js";
import mailSend from "#utils/mailSender.js";
import otpGenerator from 'otp-generator'
import mongoose from "mongoose";
import OtpModel from "#models/otp.model.js";

/**
 * @desc		Send OTP
 * @route		POST /api/v1/users/otp
 * @access	public
 */
const sendOtp = async (req, res) => {
  const { email } = req.body;

  const existingOtp = await OtpModel.findOne({ email });

  if (existingOtp) {
    mailSend('otp', existingOtp);
    return res.status(200).json({
      email: existingOtp.email,
    });
  }

  const generatedOtp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });

  const newOtp = await OtpModel.create({ email, otp: generatedOtp });
  mailSend('otp', newOtp);

  return res.status(200).json({
    email: newOtp.email,
  });

};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const otpEntry = await OtpModel.findOne({ email, otp });

  if (otpEntry) {
    return res.status(200).json({
      message: 'OTP Verified Sucessfully'
    });
  } else {
    res.status(404);
    throw new Error('OTP Verificaton Failed')
  }

};


/**
 * @desc		Login user
 * @route		POST /api/v1/users/login
 * @access	public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;


  const user = await userModel.findOne({ email, isActive: true });

  if (user && await user.matchPassword(password)) {
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email or Password');
  }

};

/**
 * @desc		Register user
 * @route		POST /api/v1/users
 * @access	public
 */
const registerUser = async (req, res) => {
  const { name, email, password, isValidOtp } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User Already Exists');
  }

  if (isValidOtp) {
    const user = await userModel.create({ name, email, password });
    if (user) {
      generateToken(res, user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });

      mailSend('welcome', user);

    } else {
      res.status(400);
      throw new Error('Invalid User Data');
    }
  } else {
    res.status(400);
    throw new Error('OTP Validation Failed');
  }



};

/**
 * @desc		Logout user
 * @route		POST /api/v1/users/logout
 * @access	private
 */
const logoutUser = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.json({ message: 'Logged Out SucessFully' })
};

/**
 * @desc		Get Login user
 * @route		GET /api/v1/users/profile
 * @access	private
 */
const getUserProfile = async (req, res) => {
  const user = await userModel.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
};


/**
 * @desc		Update user profile
 * @route		PUT /api/v1/users/profile
 * @access	private
 */
const updateUserProfile = async (req, res) => {
  const user = await userModel.findById(req.user._id);


  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;


    // if (req.body.password) {
    //   user.password = req.body.password;
    // }

    const updatedUser = await user.save();
    mailSend("update", updatedUser.toObject());
    generateToken(res, updatedUser._id);

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
};


/**
 * @desc		Get all user
 * @route		GET /api/v1/users
 * @access	private/admin
 */
const getUser = async (req, res) => {
  const pageSize = +req.query.pageSize || 5;
  const page = +req.query.pageNumber || 1;

  const searchCondition = mongoose.Types.ObjectId.isValid(req.query.keyword)
    ? [{ _id: req.query.keyword }]
    : [
      { name: { $regex: req.query.keyword, $options: 'i' } },
      { email: { $regex: req.query.keyword, $options: 'i' } }
    ]

  const keyword = req.query.keyword
    ? {
      $or: [
        ...searchCondition,
      ]
    }
    : {}

  const users = await userModel.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));



  const count = await userModel.countDocuments({ ...keyword });

  res.status(200).json({ users, page, pageSize, pages: Math.ceil(count / pageSize) });
};

/**
 * @desc		Get all user by Id
 * @route		GET /api/v1/users/:id
 * @access	private/admin
 */
const getUserById = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
};

/**
 * @desc		Delete User
 * @route		DELETE /api/v1/users/:id
 * @access	private/admin
 */
const deleteUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('You Cannot Delete an Admin User');
    };

    const deletedUser = await userModel.deleteOne({ _id: req.params.id });

    mailSend('delete', user);
    res.status(200).json({ message: 'User Deleted Sucessfully' });

  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
};


/**
 * @desc		Update User
 * @route		PUT /api/v1/users/:id
 * @access	private/admin
 */
const updateUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;


    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
};

/**
 * @desc		Enable User
 * @route		PUT /api/v1/users/:id/enable
 * @access	private/admin
 */
const enableUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("This Action Can't Be Formed");
    }
    user.isActive = true;

    const updatedUser = await user.save();
    mailSend("reactivate", updatedUser.toObject());
    res.status(200).json({ message: 'Account Activated Sucessfully.' });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
};

/**
 * @desc		Enable User
 * @route		PUT /api/v1/users/:id/disable
 * @access	private/admin
 */
const disableUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("This Action Can't Be Formed");
    }
    user.isActive = false;

    const updatedUser = await user.save();
    mailSend("deactivate", updatedUser.toObject());

    res.status(200).json({ message: 'Account Deactivated Sucessfully.' });
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
};

export {
  sendOtp,
  verifyOtp,
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  updateUserProfile,
  getUserProfile,
  enableUser,
  disableUser
};