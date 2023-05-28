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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.getAll = exports.deleteUser = exports.update = exports.getId = exports.login = exports.register = void 0;
const service = __importStar(require("../service/users.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = require("../helpers/generateToken");
const auth_1 = require("../middleware/auth");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.password !== req.body.retypePassword)
            return next({ status: 400, message: 'Password do not math!' });
        const user = req.body;
        const findUser = yield service.findUser(user);
        if (findUser.length > 0)
            return next({ status: 400, message: 'User already exist!' });
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(user.password, salt);
        yield service.register(Object.assign(Object.assign({}, user), { password: hash }));
        res.status(200).json({ success: true, message: 'Create user success!' });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.findUser({ email: req.body.email, password: req.body.password });
        if (user.length === 0)
            return next({ status: 404, message: 'User not found!' });
        const isMatch = bcryptjs_1.default.compareSync(req.body.password, user[0].password);
        if (!isMatch)
            return next({ status: 404, message: 'Password do not match!' });
        const accessToken = yield (0, generateToken_1.createAccessToken)({ id: user[0].id, role: user[0].role }, process.env.ACCESS_TOKEN_SECRET);
        const refreshToken = yield (0, generateToken_1.createRefreshToken)({ id: user[0].id, role: user[0].role }, process.env.REFRESH_TOKEN_SECRET);
        const _a = user[0], { password, createdAt, updatedAt } = _a, data = __rest(_a, ["password", "createdAt", "updatedAt"]);
        res.status(200).json({ success: true, message: 'Login success!', user: data, accessToken, refreshToken });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const getId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const accessToken = req.headers.authorization;
        const decode = yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (decode.id.toString() !== id && decode.role !== 'admin')
            return next({ status: 403, message: "You don't have permission view this!" });
        const user = yield service.findUser({ id: id });
        if (user.length === 0)
            return next({ status: 404, message: 'User not found!' });
        const _b = user[0], { password, createdAt, updatedAt } = _b, data = __rest(_b, ["password", "createdAt", "updatedAt"]);
        res.status(200).json({ success: true, message: 'Get user success!', user: data });
    }
    catch (err) {
        next(err);
    }
});
exports.getId = getId;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const { id } = req.params;
        const accessToken = req.headers.authorization;
        const decode = yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (decode.id.toString() !== id && decode.role !== 'admin')
            return next({ status: 403, message: "You don't have permission update this!" });
        const user = yield service.findUser({ id: id });
        if (user.length === 0)
            return next({ status: 404, message: 'User not found!' });
        if (req.body.password !== req.body.retypePassword)
            return next({ status: 404, message: 'Password do not match!' });
        if ((_c = req.body) === null || _c === void 0 ? void 0 : _c.password) {
            const salt = bcryptjs_1.default.genSaltSync(10);
            req.body.password = bcryptjs_1.default.hashSync((_d = req.body) === null || _d === void 0 ? void 0 : _d.password, salt);
        }
        else
            delete req.body.password;
        delete req.body.retypePassword;
        yield service.update(Object.assign(Object.assign({}, req.body), { id }));
        res.status(200).json({ success: true, message: 'Update user success!' });
    }
    catch (err) {
        next(err);
    }
});
exports.update = update;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const accessToken = req.headers.authorization;
        const decode = yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (decode.id.toString() !== id && decode.role !== 'admin')
            return next({ status: 403, message: "You don't have permission delete this!" });
        const user = yield service.findUser({ id: id });
        if (user.length === 0)
            return next({ status: 404, message: 'User not found!' });
        yield service.deleteUser(id);
        res.status(200).json({ success: true, message: "Delete user success!" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization;
        let decode;
        if (accessToken) {
            decode = yield (0, auth_1.verifyToken)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        }
        if (decode && decode.role === 'admin') {
            const users = yield service.getAll();
            return res.status(200).json({ success: true, message: 'Get user success!', users });
        }
        const users = yield service.getByAdmin();
        res.status(200).json({ success: true, message: 'Get user success!', users });
    }
    catch (err) {
        next(err);
    }
});
exports.getAll = getAll;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.body.refreshToken;
        const decode = yield (0, auth_1.verifyToken)(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = yield (0, generateToken_1.createAccessToken)({ id: decode.id, role: decode.role }, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ success: true, message: 'Refresh access-token success!', accessToken });
    }
    catch (error) {
        next(error);
    }
});
exports.refreshToken = refreshToken;
