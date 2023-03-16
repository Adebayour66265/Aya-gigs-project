import  Discussion  from '../../model/Discussion.js';

export const getDiscussionId = async (req, res) => {
  const result = await Discussion.findById(req.params.id).populate('comments')
  return res.status(200).json(result)
}
