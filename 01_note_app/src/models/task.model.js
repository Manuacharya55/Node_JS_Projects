import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    name: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model("Task", taskSchema);
