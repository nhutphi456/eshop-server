const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const keys = require("../../config/keys");
const { secret, tokenExpiresIn } = keys.jwt;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Email does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Wrong password. Please try again",
      });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, secret, { expiresIn: tokenExpiresIn });
    res.status(200).json({
      success: true,
      accessToken: token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: "Something went wrong. Please try again!",
    });
  }
});

router.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({
        error: "Email already exists",
      });
    }

    const user = new User({
      email,
      firstName,
      lastName,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    const registeredUser = await user.save();

    res.status(200).json({
      success: true,
      user: {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: "Something went wrong. Please try again!",
    });
  }
});

module.exports = router;
