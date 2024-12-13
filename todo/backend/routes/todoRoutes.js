const express = require('express')
const router = express.Router()
const { addTodo, getAllTodo, updateTodo, deleteTodo } = require('../controller/todoController')

router.post('/add', addTodo)
router.get('/all', getAllTodo)
router.put('/update/:id', updateTodo)
router.delete('/delete/:id', deleteTodo)

module.exports = router