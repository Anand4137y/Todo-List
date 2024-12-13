const Todo = require('../models/todomodel')

// create a todo 
const addTodo = async (req, res) => {
    try {
        const { title, description, status } = req.body
        if (!title) {
            return res.status(400).json({ message: "Title required" })
        }
        const todo = new Todo({
            title,
            description,
            status
        })
        await todo.save()

        res.status(200).json({ message: "new Todo Created" })
    } catch (error) {
        return res.status(500).json({ message: "Internal addTodo Error" })
    }
}
//  retrieve all todos

const getAllTodo = async (req, res) => {
    try {
        const todos = await Todo.find()

        if (!todos) return res.status(400).json({ message: "no todo was existed" })

        res.status(200).json(todos)
    } catch (error) {
        return res.status(500).json({ message: "Internal getAllTodo Error" })
    }

}

// update a todo
const updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, status } = req.body

        const todo = await Todo.findByIdAndUpdate(id, { title, description, status })

        if (!todo) return res.status(400).json({ message: "Todo not found" })

        res.status(200).json(todo)
    } catch (error) {
        return res.status(500).json({ message: "Internal UpdateTodo Error" })
    }
}
//  delete a todo

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const todo = await Todo.findByIdAndDelete(id)

        if (!todo) return res.status(400).json({ message: "Todo not found" })

        res.status(200).json({ message: "Todo Deleted" })

    } catch (error) {
        return res.status(500).json({ message: "Internal UpdateTodo Error" })
    }
}



module.exports = { addTodo, getAllTodo, updateTodo, deleteTodo }