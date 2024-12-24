import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Name Is Required'],
  },
  email: {
    type: String,
    required: [true, 'Email Is Required'],
    unique: [true, 'User Email Must Me Unique']
  },
  password: {
    type: String,
    required: [true, 'Password Is Required'],
  },
  isAdmin: {
    type: Boolean,
    required: [true, 'User Admin Status Is Required'],
    default: false,
  },
  isActive: {
    type: Boolean,
    required: [true, 'User Active Status Is Required'],
    default: true,
  }
},
  {
    timestamps: true,
    collection: 'users'
  }
);


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {

  if (this.isModified('password')) {
    console.log('hashing');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    next();
  }

});

const userModel = mongoose.model('UserModel', userSchema);
export default userModel;