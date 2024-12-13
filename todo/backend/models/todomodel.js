const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    status: ({
        type: String,
        enum: ["pending", "in-progress", "completed"],
        default: "pending"
    })
}, {
    timestamps: true
})
const todoModel = mongoose.model('Todo', todoSchema)

module.exports = todoModel
