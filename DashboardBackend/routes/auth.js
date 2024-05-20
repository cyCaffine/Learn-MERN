const express = require("express");

const { register, login, forgotPassword, resetPassword} = require("../controllers/auth");

const router = express.Router();


// /register endpoint ko register controller function se map kiya jata hai jo POST request ko handle karta hai.
router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/resetPassword",  resetPassword);





module.exports = router;
