import Course from "../model/Courses.js";
import Question from "../model/question.js";
import Quiz from "../model/quiz.js";
import mongoose from "mongoose";

export const addQuestion = async (req, res) => {
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
    quiz.questions.push(newQuestion._id); // push the question's _id to the array
    await quiz.save(); // save the quiz with the updated questions array
    res.status(201).json({ message: 'Question created', data: newQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllQuestions = async (req, res) => {
  try {
    const { courseId, quizId } = req.params;
    // Validate that courseId and quizId are valid MongoDB ObjectIds
    if (!mongoose.isValidObjectId(courseId) || !mongoose.isValidObjectId(quizId)) {
      return res.status(400).json({ error: 'Invalid courseId or quizId' });
    }
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    const questions = quiz.questions;
    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: 'No questions found for this quiz' });
    }
    res.status(200).json({ data: questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Get one question by ID 
export const getOneQuestion = async (req, res) => {
  try {
    const { courseId, quizId, questionId } = req.params;
    // Validate that courseId, quizId, and questionId are valid MongoDB ObjectIds
    if (!mongoose.isValidObjectId(courseId) || !mongoose.isValidObjectId(quizId) || !mongoose.isValidObjectId(questionId)) {
      return res.status(400).json({ error: 'Invalid courseId, quizId, or questionId' });
    }
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    const question = quiz.questions.find(q => q._id.equals(questionId));
    if (!question) {
      return res.status(404).json({ error: 'Question not found for this quiz' });
    }
    res.status(200).json({ data: question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
// Update a question by ID 
export const updateQuestion = async (req, res) => {
  try {
    const { courseId, quizId, questionId } = req.params;
    const { question, options, answer } = req.body;
    const quiz = await Quiz.findById(quizId).populate('questions');
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    const questionIndex = quiz.questions.findIndex(q => q._id.equals(questionId));
    if (questionIndex === -1) {
      return res.status(404).send('Question not found');
    }
    const updatedQuestion = await Question.findByIdAndUpdate(questionId, {
      question,
      options,
      answer,
    }, { new: true });
    quiz.questions.set(questionIndex, updatedQuestion);
    await quiz.save();
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message })
  }
  }

export const deleteQuestion = async(req, res) => {
  try {
    const { courseId, quizId, questionId } = req.params;
    const course = await Course.findById(courseId).populate('quizzes');
    const quiz = course.quizzes.find((q) => q._id.equals(quizId));
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found in the course' });
    }
    const questionIndex = quiz.questions.findIndex((q) => q._id.equals(questionId));
    if (questionIndex === -1) {
      return res.status(404).json({ error: 'Question not found in the quiz' });
    }
    quiz.questions.splice(questionIndex, 1);
    await quiz.save();
    await Question.findByIdAndDelete(questionId);
    res.status(200).json({ message: 'Question deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
    }