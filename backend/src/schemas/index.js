import userSchema from './userSchema'
import postSchema from './postSchema'
import todoSchema from './todoSchema'
import { gql } from 'apollo-server'

const linkSchema = gql`
    type Query {
        _: Boolean
    }

    type Mutation {
        _:Boolean
    }
`

export default [linkSchema, userSchema, postSchema, todoSchema]