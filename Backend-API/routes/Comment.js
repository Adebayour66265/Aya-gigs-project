import express from 'express'

const router = express.Router()
import { addComment } from '../controller/Comment/addComment'
import { getAllComment } from '../controller/Comment/getAllComment'
import { getOneComment } from '../controller/Comment/getOneComment'
import { deleteComment } from '../controller/Comment/deleteComment'
import { updateComment } from '../controller/Comment/updateComment'

router.post('/:id', addComment)
router.get('/:id', getAllComment)
router.get('/:postId/comments/:commentId/getone', getOneComment)
router.delete('/:commentId', deleteComment)

router.put('/putcomment/:commentId', updateComment)

module.exports = router
