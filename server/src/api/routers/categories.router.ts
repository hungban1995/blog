import express from "express";
import * as controller from '../controller/categories.controller'
const router = express.Router();
const categoriesRouter = async (app: express.Express) => {
    router.post('/create', controller.create)
    router.get("/get-all", controller.getAll);
    router.get("/get-id/:id", controller.getId);
    router.get("/category/:title", controller.getByName);

    router.put('/update/:id', controller.updateCat)
    router.delete('/delete', controller.deleteCat)
    return app.use("/api/categories", router);
}
export default categoriesRouter;