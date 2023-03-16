import Question from "../model/question.js";
import Quiz from "../model/quiz.js";

export const addQuestion = async (req, res) => {
    try {
      const {questionText , options } = req.body;
      const quiz = await Quiz.findById(req.params.quizId);
      const question = new Question({ questionText , options });
      await question.save();
      quiz.questions.push(question);
      await quiz.save();
      res.json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const getAllQuestions = async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.quizId).populate('questions');
      res.json(quiz.questions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const getOneQuestion = async(req, res) => {
    try {
      const question = await Question.findById(req.params.questionId);
      res.json(question);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }

export const updateQuestion = async (req, res) => {
    try {
      const question = await Question.findByIdAndUpdate(
        req.params.questionId,
        { $set: req.body },
        { new: true }
      );
      res.json(question);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    }

    export const deleteQuestion = async(req, res) => {
        try {
            const deletedQuestion = await Quiz.findByIdAndDelete(req.params.id);
            if (deletedQuestion) {
                return res.status(200).json({
                  status: 'Question deleted successfully',
                  data: { deletedQuestion },
                })
              } else {
                res.status(404).json({
                  status: 'error',
                  message: 'Question not found',
                })
              }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }