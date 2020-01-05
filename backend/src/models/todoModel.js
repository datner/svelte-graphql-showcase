import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    assignee: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
})

const todo = new mongoose.model('todo', todoSchema)

export default todo