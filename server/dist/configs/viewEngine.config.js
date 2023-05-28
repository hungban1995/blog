"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dirname = path_1.default.resolve();
const viewEngineConfig = (app) => {
    app.use(express_1.default.static(dirname + "/public"));
    app.set("viewEngine", "ejs");
    app.set("views", "./src/views");
};
exports.default = viewEngineConfig;
