import express, { Express, Request, Response, NextFunction, Application } from 'express'
import createError from 'http-errors';
import usersRouter from './api/routers/users.router'
import parseConfig from './configs/parser';
import { catchError } from './api/helpers/type';
const port = 8080 || 5000
const app: Express = express()

const handleError: catchError = (error, req, res, next) => {
    if (error && error.status) return res.status(error.status).json({ status: error.status, message: error.message })
}
parseConfig(app)
//routes
usersRouter(app)
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