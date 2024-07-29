import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js"
import cookieParser from "cookie-parser";
import multer from "multer";

const registerPage = asyncHandler((req,res)=>{
  res.render("index")
})

const registerUser =asyncHandler( async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body;
  const image = req.file.filename;

  if (!username || !firstname || !email || !password) {
    throw new ApiError(400, "required fields are empty");
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new ApiError(400, "Username already exists");
  }

  const newUser = await User.create({
    username,
    firstname,
    lastname,
    email,
    password,
    image
  });

  res.status(200).redirect("/blogify/login");
});

const loginPage = asyncHandler((req,res)=>{
  res.render("login")
})

const loginUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "required fields are empty");
  }

  if (!password) {
    throw new ApiError(401, "required fields are empty");
  }

  const existingUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  const verify = await existingUser.isPasswordCorrect(
    password,
    existingUser.password
  );

  if (!verify) {
    throw new ApiError(400, "invalid credentials");
  }

  const jwttoken = existingUser.generateJwtToken();

  const loggedinUser = await User.findById(existingUser._id).select(
    "-password -__v"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("logintoken", jwttoken, options)
    .redirect("/blogify/home");
});

const logout = asyncHandler(async(req,res)=>{
  res.clearCookie("logintoken").redirect("/blogify/login")
});

export { registerPage,registerUser,loginPage, loginUser ,logout};
