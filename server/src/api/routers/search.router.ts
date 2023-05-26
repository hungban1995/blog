import express from "express";
import { searchData } from "../controller/search.controller";
const router = express.Router();
const searchRouter = async (app: express.Express) => {
    router.get('/', searchData)

    return app.use("/api/search", router);
}
export default searchRouter;