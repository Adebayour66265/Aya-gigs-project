import Discussion  from '../../model/Discussion';

export const deleteDiscussion  = async (req, res) => {
  await Discussion.deleteOne({ _id: req.params.id })
  res.status(200).json({ message: 'Deleted!' })
}
