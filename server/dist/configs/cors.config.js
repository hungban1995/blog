"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsConfig = (app) => {
    const corsOptionsDelegate = function (req, callback) {
        const corsOptions = { origin: true };
        callback(null, corsOptions);
    };
    app.use((0, cors_1.default)(corsOptionsDelegate));
};
exports.default = corsConfig;
