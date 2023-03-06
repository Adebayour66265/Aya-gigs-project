const Discussion = require('../../Model/Discussion')

module.exports = async (req, res) => {
  const result = await Discussion.find().populate('comments')
  return res.status(200).json(result)
}
