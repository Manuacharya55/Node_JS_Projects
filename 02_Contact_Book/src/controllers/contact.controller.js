import Contact from "../models/contact.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const displayContact = asyncHandler(async (req, res) => {
  const { category } = req.query;

  let allContact;

  const query = category && category !== "all" ? { category } : {};
  allContact = await Contact.find(query);

  if (!allContact) {
    res.status(200).json({
      message: "Successfull message",
      data: "no data found",
    });
  }

  res.render("index", { allContact });
});



const addContactForm = asyncHandler(async (req, res) => {
  res.render("form");
});



const addContact = asyncHandler(async (req, res) => {
  const { name, number, email, category, address } = req.body;
  const image = req.file.filename;
  if (!name || !number || !category) {
    throw new ApiError(400, "required fields are empty");
  }

  const contact = await Contact.create({
    name,
    number,
    image,
    email,
    category,
    address,
  });

  res.redirect("/api/v1/contact");
});



const editContactForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fetchedContact = await Contact.findById(id);

  if (!fetchedContact) {
    throw new ApiError(400, "no such contact");
  }

  res.render("editform", { fetchedContact });
});



const editContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const fetchedContact = await Contact.findById(id);

  if (!fetchedContact) {
    throw new ApiError(400, "no such contact");
  }
  const editedcontact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.redirect("/api/v1/contact");
});



const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fetchedContact = await Contact.findById(id);

  if (!fetchedContact) {
    throw new ApiError(400, "no such contact");
  }

  await Contact.findByIdAndDelete(id);

  res.redirect("/api/v1/contact");
});



export {
  displayContact,
  addContact,
  editContact,
  deleteContact,
  addContactForm,
  editContactForm,
};
