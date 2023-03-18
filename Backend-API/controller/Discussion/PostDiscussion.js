import  Discussion  from '../../model/Discussion.js';
// const User = require('../../model/User')
import postDiscusion from '../../validation/Discussion/postDisscussion.js'
import cloudinaryUtil  from '../../utilis/cloudinary.js';

console.log(cloudinaryUtil)
export const postDiscussion = async (req, res) => {
  
  const { value, error } = postDiscusion(req.body)
  if (error) return res.status(400).send({ error: error.details[0].message })
  const { title, author, body } = value
  // const user = await User.findOne({ _id: req.user._id }).select(
  //   'fullname email -_id',
  // )
  console.log(await cloudinaryUtil.uploader.upload(req.file.path), 'yello' )
  const {
    secure_url: image,
    public_id: cloudinary_id,
  } = await cloudinaryUtil.uploader.upload(req.file.path)
  await Discussion.create({
    image,
    cloudinary_id,
    title,
    author,
    body,
    // user,
  })
  const data = {
    image,
    title,
    author,
    // user,
    body,
  }
  return res.status(200).json({ message: 'Discussion Post created', data })
}
