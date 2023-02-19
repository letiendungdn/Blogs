const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      require: true,
    },
    canShare: {
      type: Boolean,
      required: true,
    },
    canComment: {
      type: Boolean,
      required: true,
    },
    canLike: {
      type: Boolean,
      required: true,
    },
    likesCount: {
      type: Number,
      require: false,
    },
    commentsCount: {
      type: Number,
      require: false,
      default: 0,
    },
    shareCount: {
      type: Number,
      require: false,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", blogSchema);
