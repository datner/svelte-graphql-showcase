import { AuthenticationError, UserInputError } from 'apollo-server'

export default {
    Query: {
        async todo(parent, args, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const todo = await ctx.models.todoModel.findById(args.id).exec()
            return todo
        },
        async todos(parent, args, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const todos = await ctx.models.todoModel.where('assignee').equals(ctx.me.id).exec()
            return todos
        }
    },
    Mutation: {
        async createTodo(parent, args, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const todo = await new ctx.models.todoModel({ ...args.data, assignee: ctx.me.id }).save()
            return todo
        },
        async deleteTodo(parent, { id }, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const todo = await ctx.models.todoModel.findById(id).exec()

            if (todo.assignee.toString() !== ctx.me.id) {
                throw new UserInputError("Logged user doesn't own this todo!")
            }
            await ctx.models.todoModel.deleteOne({ _id: id })

            return todo
        },
        async updateTodo(parent, { data }, ctx, info) {
            if (!ctx.me) {
                throw new AuthenticationError("You are not authenticated!")
            }
            const todo = await ctx.models.todoModel.findById(data.id).exec()
            if (todo.assignee.toString() !== ctx.me.id) {
                throw new UserInputError("Logged user doesn't own this todo!")
            }
            const { id, ...update } = data

            const updatedTodo = await ctx.models.todoModel.findByIdAndUpdate(id, update, { new: true })
            return updatedTodo
        }
    },
    Todo: {
        async assignee(parent, args, ctx, info) {
            const user = ctx.models.userModel.findById(parent.assignee).exec()
            return user
        }
    }
}