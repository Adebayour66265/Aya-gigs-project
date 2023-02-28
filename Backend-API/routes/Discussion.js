// const multer = require('multer')
const express = require('express')

const router = express.Router()

// const auth = require('../middleware/auth')

// const storage = require('../utilis/multer')

// const upload = multer({ storage })

const PostDiscussion = require('../controller/Discussion/PostDiscussion')
const updateDiscussion = require('../controller/Discussion/updateDiscussion')
const getDiscussionId = require('../controller/Discussion/getDiscussionId')
const getAllDiscussion = require('../controller/Discussion/getAllDiscussion')
const deleteDiscussion = require('../controller/Discussion/deleteDiscussion')
const DiscussionPagination = require('../controller/Discussion/DiscussionPagination')

router.post('/', PostDiscussion)
router.get('/:id', validateObjectId, asyncMiddleware(getDiscussionId))

router.post('/', auth, upload.single('image'), asyncMiddleware(createDiscussion))

router.put('/:id', auth, upload.single('image'), asyncMiddleware(updateDiscussion))

router.delete('/:id', auth, asyncMiddleware(deleteDiscussion))


module.exports = router
