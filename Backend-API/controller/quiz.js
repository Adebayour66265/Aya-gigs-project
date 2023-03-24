import Course from "../model/Courses.js";
import Quiz from "../model/quiz.js";

export const postQuiz = async(req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if(!course){
          return res.status(404).json({error:'course not found'});
        }
        const quiz = new Quiz(req.body);
        quiz.course = course._id;
        await quiz.save();
        course.quizzes.push(quiz);
        await course.save();
        res.status(201).json({ message: 'Quiz created', data: quiz });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
export const updateQuiz= async(req, res) => {
  try {
    const { title, description, questions } = req.body;
    const courseId = req.params.courseId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId).populate('quizzes');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const quiz = course.quizzes.find((quiz) => quiz._id == quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    quiz.title = title;
    quiz.description = description;
    quiz.questions = questions;
    await quiz.save();
    return res.status(200).json({
      status: 'success',
      data: { quiz },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllQuizForCourse = async(req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate('quizzes');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const quizzes = course.quizzes;
    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes found for this course' });
    }
    return res.status(200).json({
      status: 'success',
      data: {
        quizzes: quizzes,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
export const getOneQuizForCourse = async(req, res) => {
  try {
    const courseId = req.params.courseId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId).populate('quizzes');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const quiz = course.quizzes.find(q => q._id.toString() === quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }
    return res.status(200).json({
    status: 'success',
    data: {
      quiz: quiz,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
export const deleteQuiz = async(req, res) => {
  try {
    const courseId = req.params.courseId;
    const quizId = req.params.quizId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const quizIndex = course.quizzes.findIndex((quiz) => quiz._id.toString() === quizId);
    if (quizIndex === -1) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }
    course.quizzes.splice(quizIndex, 1);
    await course.save();
    return res.status(200).json({
      status: 'success',
      message: 'Quiz deleted from course',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
  }