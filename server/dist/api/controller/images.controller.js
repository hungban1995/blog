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
exports.deleteImage = exports.getId = exports.getAll = exports.upload = void 0;
const auth_1 = require("../middleware/auth");
const service = __importStar(require("../service/images.service"));
const fs_1 = __importDefault(require("fs"));
const upload = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.destination.slice(9);
        const filename = (_b = req.file) === null || _b === void 0 ? void 0 : _b.filename;
        const url = `${path}/${filename}`;
        const uploadBy = req.body.user;
        const imageUpload = {
            url,
            uploadBy
        };
        yield service.upload(imageUpload);
        res.status(200).json({ success: true, message: 'Upload image success!', url });
    }
    catch (err) {
        next(err);
    }
});
exports.upload = upload;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const images = yield service.findImages({}, null);
        res.status(200).json({ success: true, message: 'Get images success!', images });
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const getId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const images = yield service.findImages({ id: id }, null);
        if (images.length === 0)
            return next({ status: 404, message: 'Image not found!' });
        res.status(200).json({ success: true, message: 'Get images success!', images: images[0] });
    }
    catch (error) {
        next(error);
    }
});
exports.getId = getId;
const deleteImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body;
        const images = yield service.findImages({}, ids);
        if (images.length === 0)
            return next({ status: 404, message: 'Image not found!' });
        const accessToken = req.headers.authorization;
        yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        for (let i of images) {
            const PATH = "./public/" + i.url;
            const fsDelete = fs_1.default.unlink(PATH, (err) => {
                if (err) {
                    return { error: err };
                }
            });
            if (fsDelete && fsDelete.error) {
                return next(fsDelete.error);
            }
        }
        yield service.deleteImage(ids);
        res.status(200).json({ success: true, message: "Delete image success!" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteImage = deleteImage;
