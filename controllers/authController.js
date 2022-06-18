const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createJWT, createHash, comparePassword } = require("../helpers/util");
const sendVerificationEmail = require("../helpers/mailer");

const register = async (req, res) => {
  try {
    const { email, userName } = req.body;
    const userExist = await User.find({ email, userName });
    if (!userExist.length === 0) {
      return res.json({ message: "Account Exist!", status: 401 });
    }
    req.body.password = await createHash(req.body.password);
    const user = await User.create(req.body);
    const { firstName, lastName, accountVerified, _id } = user;
    const userProfile = {
      _id,
      firstName,
      lastName,
      userName,
      email,
      accountVerified
    }
    const token = createJWT(userProfile);
    // const verifUrl = `${process.env.BASE_URL}/auth/verifyEmail/${token}`;
    // sendVerificationEmail(user.email, user.userName, verifUrl);
    res.status(200).json({ message: "Account Registered!", userProfile, token, status: 200 });
  } catch (err) {
    res.json({ message: "Try Again!", status: 500 });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "Enter Email, Password", status: 401 });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User Not Found!", status: 401 });
    }
    const isPassMatch = await comparePassword(password, user.password);
    if (!isPassMatch) {
      return res.json({ message: "Invalid Password!", status: 401 });
    }
    const { firstName, lastName, userName, accountVerified, _id } = user;
    const userProfile = {
      _id,
      firstName,
      lastName,
      userName,
      email,
      accountVerified
    }
    const token = createJWT(userProfile);
    res.status(200).json({ message: "Success!", userProfile, token, status: 200 });
  } catch (err) {
    console.log(err)
    res.json({ message: "Try Again!", status: 500 });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const payload = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: payload.id });
    if (user.accountVerified) {
      return res.status(200).json({ msg: "Account already Verified" });
    } else {
      await User.updateOne({ _id: payload.id }, { accountVerified: true });
      return res.status(200).json({ msg: "Account Verified" });
    }
  } catch (err) {
    res.status(500).json({ msg: err, status: 500 });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
};
