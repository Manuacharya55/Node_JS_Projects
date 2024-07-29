import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      minlength: 10,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export { Blog };
