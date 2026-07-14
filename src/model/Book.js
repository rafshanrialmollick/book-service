import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      default: "General",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    pages: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    published: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    publishedYear: {
      type: Number,
      default: null,
    },
    tags: [String],
  },
  {
    timestamps: true,
  },
);
bookSchema.index({
  title: "text",
  author: "text",
  genre: "text",
  description: "text",
  tags: "text",
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
