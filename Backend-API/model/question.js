import mongoose from "mongoose";

const questionSchema =new mongoose.Schema(
    {
        questionText: {
            type: String,
            required: true
        },
        options:[
            {
                text:{
                    type:String,
                    required: true
                },
                isCorrect:{
                    type: Boolean,
                    required: true,
                    default: false
                }
            }
        ],
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Quiz',
            required: true,
        }
    }
)
const Question = mongoose.model('Question', questionSchema)

export default Question