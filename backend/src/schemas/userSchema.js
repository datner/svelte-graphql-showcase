import {gql} from 'apollo-server'

export default gql`
    type User {
        id: ID!
        username: String!
        posts: [Post!]!
    }

    type Token {
        token: String!
    }

    extend type Query {
        user(id: ID!): Post!
        login(username: String!, password: String!): Token!
    }

    extend type Mutation {
        createUser(username: String!, password: String!): User!
    }
`