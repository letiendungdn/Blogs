const User = require("../models/usersModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//Register a new user
router.post("/register", async (req, res) => {
  try {
    // check if the user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //create a new user
    const newUser = new User(req.body);
    //save the user
    await newUser.save();

    res.send({
      success: true,
      message: "User registered Successfully, Please login to continue",
    });
  } catch (error) {}
});

//Login a user
router.post("/login", async (req, res) => {
  try {
    //check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User does not exist",
      });
    }
    //check if the password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }
    //create a token
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.jwt_secret,
      {
        expiresIn: "1d",
      }
    );
    //send the token to the client
    res.send({
      success: true,
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get user details from token

router.get("/getUser", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
