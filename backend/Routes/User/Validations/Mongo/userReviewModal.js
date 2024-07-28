import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: [true, "The Username Field0000 Cannot be empty"],
    minlength: [8, "Username must be at least 8 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [7, "Password must be at least 7 characters long"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]+$/.test(v);
      },
      message: "Password must be alphanumeric",
    },
  },
});

export const User = mongoose.model("Users", userSchema);
