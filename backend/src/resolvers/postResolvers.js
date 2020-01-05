import { AuthenticationError } from 'apollo-server'

export default {
    Query: {
        async post(parent, args, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const post = await ctx.models.postModel.findById(args.id).exec()
            return post
        },
        async posts(parent, args, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const posts = await ctx.models.postModel.where('author').equals(ctx.me.id).exec()
            return posts
        }
    },
    Mutation: {
        async createPost(parent, args, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const post = await new ctx.models.postModel({ ...args, author: ctx.me.id }).save()
            return post
        }
    },
    Post: {
        async author(parent, args, ctx, info) {
            const user = ctx.models.userModel.findById(parent.author).exec()
            return user
        }
    }
}