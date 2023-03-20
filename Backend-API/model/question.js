import mongoose from "mongoose";

const questionSchema =new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            //required: true
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
            //required: true
        },
        question: {
            type: String,
            required: true
        },
        options: {
            type: [String],
            required: true
        },
        answer: {
            type: Number,
            required: true
        }
    });
const Question = mongoose.model('Question', questionSchema)

export default Question