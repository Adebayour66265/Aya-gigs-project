// const multer = require('multer')
const express = require('express')

const router = express.Router()

// const auth = require('../middleware/auth')

// const storage = require('../utilis/multer')

// const upload = multer({ storage })

const PostDiscussion = require('../controller/Discussion/PostDiscussion')

router.post('/', PostDiscussion)

module.exports = router
