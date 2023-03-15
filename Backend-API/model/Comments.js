import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    postedBy: String,
    blogpost: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
  },
  { timestamps: true },
)

export default mongoose.model('Comment', commentSchema)
