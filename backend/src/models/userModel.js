import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'post'
        }
    ]
})

userSchema.pre('save', async function () {
    console.log("USER_SCHEMA: PRE SAVE")
    const hashed = await bcrypt.hash(this.password, 12)
    this.password = hashed;
})

const user = mongoose.model('user', userSchema)

export default user