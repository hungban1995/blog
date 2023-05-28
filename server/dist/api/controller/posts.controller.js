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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getByUrl = exports.getByCat = exports.updatePost = exports.getPostId = exports.getAll = exports.createPost = void 0;
const auth_1 = require("../middleware/auth");
const categoryLookup_service_1 = require("../service/categoryLookup.service");
const services = __importStar(require("../service/posts.service"));
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = req.body;
        const accessToken = req.headers.authorization;
        const decode = yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (decode.role !== 'admin')
            return next({ status: 403, message: "You don't have permission create post!" });
        const createPost = yield services.createPost(post);
        if (post.catIds.length === 0) {
            return next({ status: 404, message: "Need an category create post!" });
        }
        const postId = createPost.insertId;
        yield (0, categoryLookup_service_1.createCatPost)(postId, post.catIds);
        res.status(200).json({ success: true, message: 'Create post success!' });
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.query;
        const limit = 5;
        const offset = (Number(page) - 1) * limit;
        const posts = yield services.getAll(limit, offset);
        res.status(200).json({ success: true, message: 'Get posts success!', posts });
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const getPostId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let post;
        if (id && id !== undefined) {
            post = yield services.getPostId(id);
        }
        return res.status(200).json({ success: true, message: 'Get post success!', post: post[0] });
    }
    catch (error) {
        next(error);
    }
});
exports.getPostId = getPostId;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const postUpdate = req.body;
        yield (0, categoryLookup_service_1.deleteCatPost)(id);
        yield (0, categoryLookup_service_1.createCatPost)(id, postUpdate.catIds);
        delete postUpdate.catIds;
        yield services.updatePost(id, postUpdate);
        res.status(200).json({ success: true, message: 'Update post success!' });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
const getByCat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const posts = yield services.getPostByCat(id);
        res.status(200).json({ success: true, message: 'Get post success!', posts });
    }
    catch (error) {
        next(error);
    }
});
exports.getByCat = getByCat;
const getByUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.params;
        const post = yield services.getByUrl(url);
        res.status(200).json({ success: true, message: 'Get post success!', post: post[0] });
    }
    catch (error) {
        next(error);
    }
});
exports.getByUrl = getByUrl;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, categoryLookup_service_1.deleteCatPost)(id);
        yield services.deletePost(id);
        res.status(200).json({ success: true, message: 'Delete post success!' });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
