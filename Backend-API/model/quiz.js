import mongoose from 'mongoose'

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }
    ],
    courseId:{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        //required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
)
const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz
