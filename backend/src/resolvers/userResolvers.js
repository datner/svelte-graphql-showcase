import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server'
import { SECRET } from '../index'

export default {
    Query: {
        async user(parent, args, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const user = ctx.models.userModel.findById(args.id).exec()
            return user
        },
        async login(parent, args, ctx, info) {
            let user = await ctx.models.userModel.findOne().where('username').equals(args.username).exec()

            if (!user) user = await new ctx.models.userModel(args).save();

            console.log({ user })
            const matchPasswords = await bcrypt.compare(args.password, user.password)

            if (!matchPasswords) {
                throw new AuthenticationError("invalid password.")
            }

            const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: 24 * 10 * 50 })

            return { token }
        }
    },
    Mutation: {
        async createUser(parent, args, ctx, info) {
            const user = await new ctx.models.userModel(args).save()
            return user
        }
    },
    User: {
        async posts(parent, args, ctx, info) {
            const posts = await ctx.models.postModel.where('author').equals(parent.id).exec()
            return posts
        }
    }
}