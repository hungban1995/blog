"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (token, secretKey) => {
    return new Promise((resolve, rejects) => {
        jsonwebtoken_1.default.verify(token, secretKey, (err, decode) => {
            if (err)
                rejects({
                    status: 401,
                    message: err.message
                });
            resolve(decode);
        });
    });
};
exports.verifyToken = verifyToken;
