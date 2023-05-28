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
exports.deleteCat = exports.updateCat = exports.getByName = exports.getId = exports.getAll = exports.create = void 0;
const auth_1 = require("../middleware/auth");
const service = __importStar(require("../service/categories.service"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body;
        const accessToken = req.headers.authorization;
        const decode = yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (decode.role !== 'admin')
            return next({ status: 403, message: "You don't have permission create category!" });
        const cats = yield service.getOneCat(null, category.title);
        if (cats.length > 0)
            return next({ status: 404, message: 'Category name already exist!' });
        yield service.createCat(category);
        res.status(200).json({ success: true, message: 'Create category success!' });
    }
    catch (error) {
        next(error);
    }
});
exports.create = create;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield service.getMultiCat();
        res.status(200).json({ success: true, message: 'Get categories success!', categories });
    }
    catch (error) {
        next(error);
    }
});
exports.getAll = getAll;
const getId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield service.getOneCat(id);
        res.status(200).json({ success: true, message: 'Get categories success!', category });
    }
    catch (error) {
        next(error);
    }
});
exports.getId = getId;
const getByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        const category = yield service.getOneCat(null, title);
        res.status(200).json({ success: true, message: 'Get categories success!', category: category[0] });
    }
    catch (error) {
        next(error);
    }
});
exports.getByName = getByName;
const updateCat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const catUpdate = req.body;
        const category = yield service.getOneCat(id);
        const accessToken = req.headers.authorization;
        const decode = yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (decode.role !== 'admin' && decode.id !== category[0].author) {
            return next({ status: 403, message: "You don't have permission to update the category!" });
        }
        yield service.updateCat(catUpdate, id);
        res.status(200).json({ success: true, message: 'Update category success!' });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCat = updateCat;
const deleteCat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ids = req.body;
        yield service.deleteCat(ids);
        res.status(200).json({ success: true, message: "Delete categories success!" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCat = deleteCat;
