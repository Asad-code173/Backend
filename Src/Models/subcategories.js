import mongoose, { Schema } from "mongoose";

const SubCategorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, lowercase: true },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
}, { timestamps: true });

export const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
