const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    author: {
        type: String,
        required: true,
      },
    typeAuthor: {
        type: String,
        required: true,
      },
    body: {
        type: String,
        required: true,
      },
    event: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    createdAt:{
        type:Date,
        default:new Date(),
      },
    }
)

const Post = model("Post", postSchema);

module.exports = Post;
