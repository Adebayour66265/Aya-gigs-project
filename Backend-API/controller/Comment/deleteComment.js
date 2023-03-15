import Comment  from'../../model/Comments'

export const deleteComment= async (req, res) => {
  await Comment.deleteOne({ _id: req.params.commentId })
  res.status(200).json({ message: 'Deleted!' })
}
