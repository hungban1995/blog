import express from "express";
import * as controller from "../controller/users.controller";
import { userLoginSchemaValidate, userRegisterSchemaValidate } from "../validation/users.validate";
const router = express.Router();
const usersRouter = async (app: express.Express) => {
    // router.get("/get-all", getUsers);
    // router.get("/get-id/:id", getUsers);

    router.post('/register', userRegisterSchemaValidate, controller.register)
    router.post('/login', userLoginSchemaValidate, controller.login)
    router.put('/update/:id', controller.update)
    router.post("/refresh-token", controller.refreshToken); //refreshToken
    router.post('/logout')
    return app.use("/api/users", router);
}
export default usersRouter;