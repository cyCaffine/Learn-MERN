const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const bcryptSalt = process.env.BCRYPT_SALT;
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  //generate salt from bcrypt libaray after that hash salt with password 
  // set hashed password in userpassword filed
  // if accur any error call the next error middleware fun
  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;

