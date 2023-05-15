import express from "express";
import * as controller from "../controller/images.controller";
import { upload } from "../middleware/upload";
const router = express.Router();
const imagesRouter = async (app: express.Express) => {
    router.post('/upload', upload, controller.upload)
    router.get("/get-all", controller.getAll);
    router.get("/get-id/:id", controller.getId);
    // router.put('/update/:id', controller.update)

    router.delete('/delete/:id', controller.deleteImage)
    return app.use("/api/images", router);
}
export default imagesRouter;