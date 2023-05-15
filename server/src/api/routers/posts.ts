import express from "express";
// import * as controller from "../controller/users.controller";
// import { userLoginSchemaValidate, userRegisterSchemaValidate } from "../validation/users.validate";
import { db } from "../../configs/db";
const router = express.Router();
const postsRouter = async (app: express.Express) => {
    router.post('/create', (req, res, next) => {
        console.log(req.body);

        const q = "INSERT INTO posts(`author`,`title`,`isDraft`) VALUES (?)";
        const value = [req.body.author, req.body.title, req.body.isDraft]
        db.query(q, [value], (err, data) => {
            console.log(err);

            if (err) return res.status(400).json('error')
            res.status(200).json('success')
        })
    })
    // router.post('/login', userLoginSchemaValidate, controller.login)
    // router.get("/get-all", controller.getAll);
    // router.get("/get-id/:id", controller.getId);
    // router.put('/update/:id', controller.update)
    // router.post("/refresh-token", controller.refreshToken); //refreshToken
    // router.post('/logout')
    // router.delete('/delete/:id', controller.deleteUser)
    return app.use("/api/posts", router);
}
export default postsRouter;