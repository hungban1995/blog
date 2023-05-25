import express from "express";
import * as controller from "../controller/posts.controller";
const router = express.Router();
const postsRouter = async (app: express.Express) => {

    router.post('/create', controller.createPost)
    router.get("/get-all", controller.getAll);
    router.get("/get-id/:id", controller.getPostId);
    router.put("/update/:id", controller.updatePost);

    router.get("/get-by-url/:url", controller.getByUrl);

    router.get('/get-by-category/:id', controller.getByCat)
    // router.delete('/delete/', controller.deleteUser)
    return app.use("/api/posts", router);
}
export default postsRouter;