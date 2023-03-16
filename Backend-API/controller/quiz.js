import Course from "../model/Courses.js";
import Quiz from "../model/quiz.js";


export const postQuiz = async(req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if(!course){
          res.status(404).json({error:'course not found'});
        }
        const quiz = new Quiz({ 
            name: req.body.name,
            description:req.body.description,
            course: req.body.courseId 
        });
        await quiz.save();
        course.quiz.push(quiz._id);
        await course.save();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
export const updateQuiz= async(req, res) => {
    try {
          const {title, description} = req.body
          const quiz = await Quiz.findByIdAndUpdate(
            {_id:req.params.quizId, courseId: req.params.courseId},
            { $set:{title, description}},
            { new: true }
          );
          if (quiz) {
            return res.status(200).json({
              status: 'success',
              data: { quiz },
            })
          } else {
            res.status(404).json({
              status: 'error',
              message: 'Quiz id not found',
            })
          }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
export const getAllQuizForCourse = async(req, res) => {
    try {
        const quizzes = await Quiz.find({ courseId: req.params.courseId });
        if (quizzes) {
            return res.status(200).json({
              status: 'success',
              data: { quizzes },
            })
          } else {
            res.status(404).json({
              status: 'error',
              message: 'not found',
            })
          }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getOneQuizForCourse = async(req, res) => {
    try {
      const{courseId, quizId}= req.params;
        const course = await Course.findById(courseId);
        if (!course){
          res.status(404).json({message: 'Course not found'});
        } 
        const quiz = course.quizzes.id(quizId)
        if(!quiz){
          res.status(404).json({message: 'Quiz not found in course'});
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'server error'});
    }
}
export const deleteQuiz = async(req, res) => {
    try {
        const {courseId, quizId} = req.params;
        const courseIndex = Course.findIndex(course => course.Id === courseId);
        if (courseIndex === -1){
          res.status(404).json({error:'course not found'});
        }
        const quizIndex = Course[courseIndex].quizzes.findIndex(quiz => quiz.Id === quizId);
        if (quizIndex === -1){
          res.status(404).json({error:'quiz not found'});
        }
        Course[courseIndex].quizzes.splice(quizIndex, 1);
        res.json({message:'quiz deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}