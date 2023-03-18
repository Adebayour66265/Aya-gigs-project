import multer from 'multer'
import express from 'express'
const discussion = express.Router()
import storage from '../utilis/multer.js'

const upload = multer({ storage })
import { postDiscussion } from '../controller/Discussion/PostDiscussion.js'
import { updateDiscussion } from '../validation/Discussion/updateDiscussion.js'
import { deleteDiscussion } from '../controller/Discussion/deleteDiscussion.js'
import { getAllDiscussion } from '../controller/Discussion/getAllDisscussion.js'
import { getDiscussionId } from '../controller/Discussion/getDisscussionId.js'

discussion.get('/', getAllDiscussion)

discussion.get('/:id', getDiscussionId)

discussion.post('/', upload.single('image'), postDiscussion)
discussion.put('/:id', upload.single('image'), updateDiscussion)

discussion.delete('/:id', deleteDiscussion)

export default discussion
