import express from "express";
import { register } from "../controller/users.controller";
import { userRegisterSchemaValidate } from "../validation/users.validate";
const router = express.Router();
const usersRouter = async (app: express.Express) => {
    // router.get("/get-all", getUsers);
    // router.get("/get-id/:id", getUsers);

    router.post('/register', userRegisterSchemaValidate, register)
    router.post('/login')
    router.post('/logout')

    return app.use("/api/users", router);
}
export default usersRouter;