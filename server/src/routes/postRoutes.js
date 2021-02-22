const { Router } = require('express')
var postController = require('../controllers/postController')

const router = Router()

router.get('/', postController.getPosts)
router.post('/create', postController.createPost)
router.put('/update/:id', postController.editPost)
router.delete('/delete/:id',postController.deletePost )

module.exports = router