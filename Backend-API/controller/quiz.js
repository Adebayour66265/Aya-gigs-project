import Quiz from "../model/quiz";
import Course from "./model/courses";

//post quiz and exams
export const postQuizAndExamsCtrl = async(req, res) => {
    try {
        const quiz = new Quiz ({
            courseId: req.params.id,
            description,
            questions
        });
        quiz.save()

        res.json({
            status: success,
            data: Quiz
        })
    
    } catch (error) {
        res.json(error.message)
    }
}