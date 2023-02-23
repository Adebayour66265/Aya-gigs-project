import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required:[true, "Question is needed"]
    },
    options: [{
        type: String,
        required:[true, "Options are needed"]
    }],
    correctOptions:{
        type: Number,
        required:[true, "correct option is needed"]
    },
    explanation: {
        type: String,
        required:[true, "explanation is needed"]
    },
});

const quizSchema = new mongoose.Schema({
    quizName:{
        type: String,
        required:[true, "Quiz name is needed"]
    },
    description:{
        type: String,
        required:[true, "description of quiz is needed"]
    },
    questions:[questionSchema]
},{
    timestamps: true,
    toJSON:{virtuals:true}
});
const Quiz = mongoose.Model("Quiz", quizSchema)

export default Quiz