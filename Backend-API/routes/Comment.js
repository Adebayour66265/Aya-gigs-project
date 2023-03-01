const express = require('express')
const asyncMiddleware = require('../middleware/async')

const router = express.Router()

const auth = require('../middleware/auth')

const addComment = require('../controller/Comment/addComment')
const getAllComment = require('../controller/Comment/getAllComment')
const getOneComment = require('../controller/Comment/getOneComment')
const deleteComment = require('../controller/Comment/deleteComment')
const updateComment = require('../controller/Comment/updateComment')

router.post('/:id', auth, asyncMiddleware(addComment))
router.get('/:id', auth, asyncMiddleware(getAllComment))
router.get(
  '/:postId/comments/:commentId/getone',
  auth,
  asyncMiddleware(getOneComment)
)
router.delete('/:commentId', auth, asyncMiddleware(deleteComment))

router.put('/putcomment/:commentId', auth, asyncMiddleware(updateComment))

module.exports = router