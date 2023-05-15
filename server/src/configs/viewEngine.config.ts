import express from "express";
import path from "path";
const dirname = path.resolve();
const viewEngineConfig = (app: express.Application) => {
    app.use(express.static(dirname + "/public"));
    app.set("viewEngine", "ejs");
    app.set("views", "./src/views");
};
export default viewEngineConfig;