import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  addBlog,
  editBlog,
  deleteBlog,
  allBlog,
  readBlog,
  addNewBlog,
  profile,
  editBlogForm,
} from "../controllers/blog.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/home").get(verifyJwt, allBlog);
router.route("/profile").get(verifyJwt, profile);
router.route("/read/:id").get(verifyJwt, readBlog);
router
  .route("/addBlog")
  .get(verifyJwt, addNewBlog)
  .post(verifyJwt, upload.single("image"), addBlog);
router
  .route("/editBlog/:id")
  .get(verifyJwt, editBlogForm)
  .post(verifyJwt, upload.single("image"), editBlog);
router.route("/deleteBlog/:id").get(verifyJwt, deleteBlog);

export default router;
