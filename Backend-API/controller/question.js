import Question from "../model/question.js";

export const addQuestion = async (req, res) =>{
    try {
        const newQuestion = await Question.create({
            questionText:req.body.questionText,
            options: req.body.options
        })
        await newQuestion.save();
        res.status(201).json(newQuestion)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
export const getOneQuestion = async(req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question){
            return res.status(404).json({message:'question not found '});
        }
        res.json(question)
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Server Error'});
    }
};
export const getAllQuestions = async(req, res) => {
    try {
        const question = await Question.find();
        res.json(question);
    } catch (err) {
        res.status(500).json({message:'Server Error'});  
    }
};
export const updateQuestion = async(req, res) => {
    //const {error} = validateInput(req.body);
    //if (error) return res.status(400).send(error.details[0].message);
    try {
        const question = await Question.findByIdAndUpdate(req.params.id);
        const {questionText, options} = req.body
        if (!question){
            return res.status(404).send("quiz with such id not found")
        } else {
            const questionUpdate = await Question.create({questionText, options});;
            await questionUpdate.save();
            res.json({
                status: success,
                data: questionUpdate
            })
        }
    } catch (error) {
        res.json(error.message)
    }
};
export const deleteQuestion = async(req, res) => {
    
    try {
        const question = await Question.findById(req.params.id)

        if (!question){
            return res.status(404).send("quiz not found")
        }
        await question.remove();

        res.json({
            status: success,
            data: question
        })
        
    } catch (error) {
        res.json(error.message)
    }

}