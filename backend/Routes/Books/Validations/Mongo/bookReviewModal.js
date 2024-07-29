import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  booktitle: {
    type: mongoose.Schema.Types.String,
    required: [true, "The Book Title Field Cannot be empty"],
  },
  bookauthor: {
    type: mongoose.Schema.Types.String,
    required: [true, "Author name is required"],
  },
  bookgenre: {
    type: mongoose.Schema.Types.String,
    required: [true, "The Books Genre is required"],
  },
  reviewText: {
    type: mongoose.Schema.Types.String,
    required: [true, "Review text is required"],
  },
  rating: {
    type: mongoose.Schema.Types.String,
    required: [true, "Rating is required"],
    validate: {
      validator: function (v) {
        return /^[1-5]$/.test(v);
      },
      message: 'Rating must be a number between 1 and 5',
    },
  },
  coverimg: {
    type: mongoose.Schema.Types.String,
    required: [true, "Cover image URL is required"],
  },
  reviewbyuser: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: [true, "User ID is required"],
  },
});

export const Review = mongoose.model("Reviews", ReviewSchema);

