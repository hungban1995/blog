import express, { Express, Request, Response, NextFunction } from 'express'
import createError from 'http-errors';

const port = 8080 || 5000
const app: Express = express()

//routes


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Server is on')
})
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500)
    res.json({
        status: error.status || 500,
        message: error.message
    })
});
app.use((req: Request, res: Response) => {
    const err = createError(404)
    res.json(err)
});
app.listen(port, () => {
    console.log(`Server running at ${port}`);
})