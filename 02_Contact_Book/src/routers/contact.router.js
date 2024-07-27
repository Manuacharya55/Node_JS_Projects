import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";

import {
  displayContact,
  addContact,
  editContact,
  deleteContact,
  addContactForm,
  editContactForm,
} from "../controllers/contact.controller.js";
const router = Router();

router
  .route("/contact")
  .get(displayContact)
  .post(upload.single("image"), addContact);

router.route("/addcontact").get(addContactForm);

router
  .route("/contact/:id")
  .get(editContactForm)
  .post(upload.single("image"), editContact);

router.route("/deletecontact/:id").get(deleteContact);

export default router;
