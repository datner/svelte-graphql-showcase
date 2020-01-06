import "core-js"
import "regenerator-runtime/runtime"
import cors from 'cors'
import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'

import schemas from './schemas'
import resolvers from './resolvers'

import userModel from './models/userModel'
import postModel from './models/postModel'
import todoModel from './models/todoModel'

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5000",
    credentials: true
}

const PORT = process.env.PORT || 3000
const SERVER_URL = process.env.URL || "localhost"
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/svelte-thing"
export const SECRET = process.env.SECRET || 'themostsecretsecret'

async function init() {
    const app = express()
    app.use(cors(corsOptions))

    const getUser = async req => {
        const token = req.headers['token']

        if (token) {
            try {
                return await jwt.verify(token, SECRET)
            } catch (e) {
                throw new AuthenticationError('Your session has expired. Sign in again')
            }
        }
    }

    const server = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        async context({ req }) {
            if (req) {
                const me = await getUser(req)

                return {
                    me,
                    models: {
                        userModel,
                        postModel,
                        todoModel
                    }
                }
            }
        }
    })

    server.applyMiddleware({ app, path: '/graphql', cors: false })

    await app.listen(PORT)
    mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true })

    console.log(`🚀  Server ready at ${SERVER_URL}:${PORT}`);

}

init()