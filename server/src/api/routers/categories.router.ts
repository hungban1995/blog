import express from "express";
import * as controller from '../controller/categories.controller'
const router = express.Router();
const categoriesRouter = async (app: express.Express) => {
    router.post('/create', controller.create)
    router.get("/get-all", controller.getAll);
    router.get("/get-id/:id",);
    router.put('/update/:id',)
    router.post('/logout')
    router.delete('/delete/:id',)
    return app.use("/api/categories", router);
}
export default categoriesRouter;