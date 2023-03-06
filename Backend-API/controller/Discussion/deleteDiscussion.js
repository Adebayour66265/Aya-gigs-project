const Discussion = require('../../model/Disscussion')

module.exports = async (req, res) => {
  await Discussion.deleteOne({ _id: req.params.id })
  res.status(200).json({ message: 'Deleted!' })
}
