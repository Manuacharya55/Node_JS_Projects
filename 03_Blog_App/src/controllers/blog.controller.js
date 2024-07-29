import { Blog } from "../models/blog.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";



const allBlog = asyncHandler(async(req,res)=>{
  const {_id} = req.user;
    const allBlog = await Blog.find({ creator: { $not: { $eq: _id } } }).populate('creator');
    res.render("home",{allBlog})
})

const readBlog =asyncHandler(async (req,res)=>{
    const {id} = req.params;

    const blog = await Blog.findById(id);

    if(!blog){
        throw new ApiError(400,"no such blogs")
    }

    res.render("readblog",{blog})
})

const profile = asyncHandler(async (req,res)=>{
  const {_id} = req.user;

  const user = await User.findById(_id).populate('blogs')
  res.render("profile",{user});
})

const addNewBlog = asyncHandler(async(req,res)=>{
    res.render("addblog")
})

const addBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  const image = req.file.filename;
  const { _id } = req.user;

  if (!title || !description || !category) {
    throw new ApiError(400, "required fields are empty");
  }

  const user = await User.findById(_id);

  if (!user) {
    throw new ApiError(400, "Token error");
  }

  const blog = await Blog.create({
    title,
    description,
    category,
    creator: user._id,
    image
  });
  user.blogs.push(blog._id);
  await user.save();

  res.redirect("/blogify/profile");
});

const editBlogForm = asyncHandler(async(req,res)=>{
  const {id} = req.params;

  const blog = await Blog.findById(id);

  if(!blog){
    throw new ApiError(400,"No such blog");
  }

  res.render("editBlog",{blog})
})

const editBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const image = req.files.filename;
  const { title, description, category } = req.body;
  const { _id } = req.user;
  const existingBlog = await Blog.findById(id);

  if (!existingBlog) {
    throw new ApiError(400, "No Blog Found");
  }

  if(!image){
    await Blog.findByIdAndUpdate(
      id,
      { title, description, category },
      { new: true }
    );
  }else{
    await Blog.findByIdAndUpdate(
      id,
      { title, description, category,image },
      { new: true }
    );
  }
    

  const newBlog = await Blog.findById(id);
  res.redirect("/blogify/profile")
});

const deleteBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;

    const user = await User.findById(_id);
    const blog = await Blog.findById(id);

    if(!blog){
        throw new ApiError(400,"No such blogs")
    }

    if(!user){
        throw new ApiError(400,"Token Error")
    }

    user.blogs = await user.blogs.filter((blogid)=> {
        return blogid != blog._id
    })

    await user.save();
    await Blog.findByIdAndDelete(id);

    res.redirect("/blogify/profile")
});

export { addBlog, editBlog, deleteBlog ,allBlog,readBlog,addNewBlog,profile,editBlogForm};
