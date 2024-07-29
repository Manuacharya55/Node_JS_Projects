import express, { Router } from "express";
import {
  registerUser,
  loginUser,
  registerPage,
  loginPage,
  logout,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router
  .route("/register")
  .get(registerPage)
  .post(upload.single('image'), registerUser);

router.route("/login").get(loginPage).post(loginUser);
router.route("/logout").get(logout);

export default router;
