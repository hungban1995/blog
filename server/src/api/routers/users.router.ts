import express from "express";
import * as controller from "../controller/users.controller";
import { userLoginSchemaValidate, userRegisterSchemaValidate } from "../validation/users.validate";
const router = express.Router();
const usersRouter = async (app: express.Express) => {
    router.post('/register', userRegisterSchemaValidate, controller.register)
    router.post('/login', userLoginSchemaValidate, controller.login)
    router.get("/get-all", controller.getAll);
    router.get("/get-id/:id", controller.getId);
    router.put('/update/:id', controller.update)
    router.post("/refresh-token", controller.refreshToken); //refreshToken
    router.post('/logout')
    router.delete('/delete/:id', controller.deleteUser)
    return app.use("/api/users", router);
}
export default usersRouter;