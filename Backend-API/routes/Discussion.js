import multer from 'multer'
import express from 'express'
const router = express.Router()
const storage = require('../utilis/multer')

const upload = multer({ storage })
import { PostDiscussion } from '../controller/Discussion/PostDiscussion'
import { updateDiscussion } from '../validation/Discussion/updateDiscussion'
import { deleteDiscussion } from '../controller/Discussion/deleteDiscussion'
import { getAllDiscussion } from '../controller/Discussion/getAllDisscussion'
import { getDiscussionId } from '../controller/Discussion/getDisscussionId'



router.get('/', getAllDiscussion)

router.get('/:id', getDiscussionId )

router.post('/', upload.single('image'), PostDiscussion )

router.put('/:id', updateDiscussion)

router.delete('/:id', deleteDiscussion)

module.exports = router
