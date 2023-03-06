// const multer = require('multer')
const express = require('express')

const router = express.Router()

const PostDiscussion = require('../controller/Discussion/PostDiscussion')
const updateDiscussion = require('../controller/Discussion/updateDiscussion')
const deleteDiscussion = require('../controller/Discussion/deleteDiscussion')

router.post('/', PostDiscussion)

router.put('/:id', updateDiscussion)

router.delete('/:id', deleteDiscussion)

module.exports = router
