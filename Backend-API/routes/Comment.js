import express from 'express'

const comments = express.Router()
import { addComment } from '../controller/Comment/addComment.js'
import { getAllComment } from '../controller/Comment/getAllComment.js'
import { getOneComment } from '../controller/Comment/getOneComment.js'
import { deleteComment } from '../controller/Comment/deleteComment.js'
import { updateComment } from '../controller/Comment/updateComment.js'

comments.post('/:id', addComment)
comments.get('/:id', getAllComment)
comments.get('/:postId/comments/:commentId/getone', getOneComment)
comments.delete('/:commentId', deleteComment)

comments.put('/putcomment/:commentId', updateComment)

export default comments;
