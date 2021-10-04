import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validation
    if (!name) return res.status(400).send("Name is Required");
    if (!password || password.length < 8) {
      return res.status(400).send("Password must be atleast 8 character long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    // Register
    const hashed = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashed,
    });
    await user.save();
    console.log("Saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("ERROR", "TRY AGAIN.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    const match = await comparePassword(password, user.password);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // return user end token to client, exclude hash password
    user.password = undefined;
    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, //Only works on https
    });
    // send user as json res
    res.json(user);
    // console.log(req.body);
  } catch (err) {
    console.log(err);
    return res.status(400).send("ERROR, Try Again");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout success" });
  } catch (err) {
    console.log(err);
  }
};
