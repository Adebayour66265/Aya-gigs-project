import Course from "../model/Courses.js";
import Question from "../model/question.js";
import Quiz from "../model/quiz.js";


// Create a new question for a quiz
export const addQuestion =async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const courseId = req.params.courseId;
    const { question, options, answer } = req.body;
    const course = await Course.findById(courseId).populate('quizzes');
    const quiz = course.quizzes.find((q) => q._id.equals(quizId));
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found in the course' });
    }
    const newQuestion = new Question({ question, options, answer });
    await newQuestion.save();
    quiz.questions.push(newQuestion);
    await quiz.save();
    res.status(201).json({ message: 'Quiz created', data: newQuestion});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message })
  }
};
// Get all questions for a quiz
export const getAllQuestions = async (req, res) => {
  try {
      const { courseId, quizId } = req.params;
      const questions = await Question.find({ courseId, quizId });
      if (!questions) {
        return res.status(404).send('not found');
    }
      res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
// Get one question by ID 
export const getOneQuestion =async (req, res) => {
  try {
  const { courseId, quizId, questionId } = req.params;
  const question = await Question.findOne({ _id: questionId, courseId, quizId });
  if (!question) {
  return res.status(404).send('Question not found');
  }
  res.status(200).json(question);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: error.message });
}
}

// Update a question by ID 
export const updateQuestion = async (req, res) => {
  try {
    const { courseId, quizId, questionId } = req.params;
    const { question, options, answer } = req.body;
    let questions = await Question.findOne({ _id: questionId, courseId, quizId });
    if (!questions) {
        return res.status(404).send('Question not found');
    }
    questions.question = question;
    questions.options = options;
    questions.answer = answer;
    const questionObj = await questions.save();
    res.status(200).json(questionObj);
    console.log(questionObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message })
  }
  }

export const deleteQuestion = async(req, res) => {
      try {
        const { courseId, quizId, questionId } = req.params;
        const question = await Question.findOne({ _id: questionId, courseId, quizId });
        if (!question) {
            return res.status(404).send('Question not found');
        }
        await question.delete();
        res.status(200).send('Question deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message })
    }
    }