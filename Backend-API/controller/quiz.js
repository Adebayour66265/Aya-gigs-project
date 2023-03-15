import Quiz from "../model/quiz.js";

export const postQuizController = async(req, res) => {
    try {
        const {title, description, questions} =  req.body;
        const quiz = await Quiz.create({title, description, questions});
        res.status(201).json(quiz);
    } catch (error) {
        res.json(error.message)
    }
}
export const updateQuizController = async(req, res) => {
    //const {error} = validateInput(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    try {
        const quizid = await Quiz.findByIdAndUpdate(req.params.id);
        
        if (!quizid){
            return res.status(404).send("quiz with such id not found")
        } else {
            const {title, description, questions} =  req.body;
            const quiz = await Quiz.create({title, description, questions});;
            await quiz.save();

            res.json({
                status: success,
                data: quiz
            })
        }
    } catch (error) {
        res.json(error.message)
    }

}

export const getAllQuizController = async(req, res) => {

    try {
        const quizzes = await Quiz.find().populate('questions');
        res.json(quizzes)
    } catch (error) {
        res.json(error.message)
    }

}

export const getOneQuizController = async(req, res) => {

    try {
        const quiz = await Quiz.findById(req.params.id).populate('questions');
        if (!quiz){
        return res.status(404).json({message:'Quiz not found'});
        }
        res.json(quiz)
    } catch (error) {
        res.json(error.message)
    }

}

export const deleteQuizController = async(req, res) => {
    
    try {
        const quiz = await Quiz.findById(req.params.id)
        if (!quiz){
            return res.status(404).send("quiz not found")
        }
        await quiz.remove();
        res.json({
            status: success,
            data: quiz
        })   
    } catch (error) {
        res.json(error.message)
    }
};

