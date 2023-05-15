import express, { Express, Request, Response, NextFunction, Application } from 'express'
import createError from 'http-errors';
import usersRouter from './api/routers/users.router'
import parseConfig from './configs/parser.config';
import { catchError } from './api/helpers/type';
import * as dotenv from "dotenv"
import corsConfig from './configs/cors.config';
import postsRouter from './api/routers/posts';
import imagesRouter from './api/routers/images.router';
import viewEngineConfig from './configs/viewEngine.config';
dotenv.config()
const port = 8080 || 5000
const app: Express = express()

const handleError: catchError = (error, req, res, next) => {
    console.log('Error::: ', error);
    if (error && error.status) return res.status(error.status).json({ status: error.status, message: error.message })
    res.status(500).json({ message: 'Internal server error!' })
}
corsConfig(app)

viewEngineConfig(app)

parseConfig(app)
//routes
usersRouter(app)
postsRouter(app)
imagesRouter(app)
app.get('/', (req, res, next) => {
    res.send('Server is on')
})


app.use(handleError)
app.use((req: Request, res: Response) => {
    const err = createError(404)
    return res.status(404).json(err)
});
app.listen(port, () => {
    console.log(`Server running at ${port}`);
})