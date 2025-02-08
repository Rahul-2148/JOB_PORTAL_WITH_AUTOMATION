import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      minLength: [3, "Name must contain atleast 3 characters"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      validate: [validator.isEmail, "Please Enter Valid Email"],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "Please Enter Your Phone Number"],
      minLength: [10, "Phone number must contain 10 digits"],
      // validate: [validator.isMobilePhone, "Please Enter Valid Phone Number"],
    },
    address: {
      type: String,
      required: [true, "Please Enter Your Address"],
    },
    domains: {
      firstDomain: String,
      secondDomain: String,
      thirdDomain: String,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password must contain atleast 8 characters"],
      maxLength: [32, "Password cannot exceed 30 characters"],
      select: false,
    },
    resume: {
      public_id: String,
      url: String,
    },
    coverLetter: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["Job Seeker", "Employer"],
    },
    photo: {
      public_id: String,
      url: String,
    },
  },
  { timestamps: true }
);

// Generate JWT token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// hashing the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
