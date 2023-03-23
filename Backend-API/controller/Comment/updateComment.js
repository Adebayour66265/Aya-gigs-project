import Comment  from'../../model/Comments.js'

export const updateComment= async (req, res) => {
  const { text } = req.body

  await Comment.updateOne(
    { _id: req.params.commentId },
    {
      $set: {
        text,
      },
    },
  )
  const data = await Comment.find({ _id: req.params.commentId }).select(
    'text -_id',
  )
  const updatedData = {
    data,
  }

  return res.status(200).send(updatedData)
}
