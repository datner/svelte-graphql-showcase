import { gql } from 'apollo-boost'

export const LOGIN = gql`
    query LOGIN($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`

export const TODOS = gql`
    query TODOS {
        todos {
            id
            title
            content
            isCompleted
        }
    }
`

export const ADD_TODO = gql`
    mutation ADD_TODO($data: TodoCreateInput) {
        createTodo(data: $data) {
            id
            title
            content
            isCompleted
        }
    }
`

export const DELETE_TODO = gql`
    mutation DELETE_TODO($id: ID!) {
        deleteTodo(id: $id) {
            id
        }
    }
`

export const UPDATE_TODO = gql`
    mutation UPDATE_TODO($data: TodoUpdateInput!) {
            updateTodo(data: $data) {
                id
                title
                content
                isCompleted
            }
        }
`