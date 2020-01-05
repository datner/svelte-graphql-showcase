import { gql } from 'apollo-server'

export default gql`
    type Todo {
        id: ID!
        title:  String!
        content: String!
        isCompleted: Boolean!
        assignee: User!
    }

    extend type Query {
        todo(id: ID!): Todo!
        todos: [Todo!]!
    }

    extend type Mutation {
        createTodo(data: TodoCreateInput): Todo!
        deleteTodo(id: ID!): Todo!
        updateTodo(data: TodoUpdateInput): Todo!
    }

    input TodoCreateInput {
        title: String!
        content: String!
        isComplete: Boolean
    }

    input TodoUpdateInput {
        id: ID!
        title: String
        content: String
        isCompleted: Boolean
    }
`