"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const users_router_1 = __importDefault(require("./api/routers/users.router"));
const parser_config_1 = __importDefault(require("./configs/parser.config"));
const dotenv = __importStar(require("dotenv"));
const cors_config_1 = __importDefault(require("./configs/cors.config"));
const posts_router_1 = __importDefault(require("./api/routers/posts.router"));
const images_router_1 = __importDefault(require("./api/routers/images.router"));
const viewEngine_config_1 = __importDefault(require("./configs/viewEngine.config"));
const categories_router_1 = __importDefault(require("./api/routers/categories.router"));
const search_router_1 = __importDefault(require("./api/routers/search.router"));
dotenv.config();
const port = 8080 || 5000;
const app = (0, express_1.default)();
const handleError = (error, req, res, next) => {
    console.log('Error::: ', error);
    if (error && error.status)
        return res.status(error.status).json({ status: error.status, message: error.message });
    res.status(500).json({ message: 'Internal server error!' });
};
(0, parser_config_1.default)(app);
(0, cors_config_1.default)(app);
(0, viewEngine_config_1.default)(app);
//routes
(0, users_router_1.default)(app);
(0, posts_router_1.default)(app);
(0, images_router_1.default)(app);
(0, categories_router_1.default)(app);
(0, search_router_1.default)(app);
app.get('/', (req, res, next) => {
    res.send('Server is on');
});
app.use(handleError);
app.use((req, res) => {
    const err = (0, http_errors_1.default)(404);
    return res.status(404).json(err);
});
app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
