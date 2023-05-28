"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("./auth");
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = req.headers.authorization;
                const decode = yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
                req.body.user = decode.id;
                const dateTime = `${(0, moment_1.default)().format('MM-yyyy')}`;
                const PATH = `./public/uploads/${dateTime}`;
                if (!fs_1.default.existsSync(PATH)) {
                    fs_1.default.mkdirSync(PATH, { recursive: true });
                }
                cb(null, PATH);
            }
            catch (error) {
                return cb(error, '');
            }
        });
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage }).single("image");
