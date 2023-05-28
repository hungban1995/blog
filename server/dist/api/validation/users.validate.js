"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchemaValidate = exports.userRegisterSchemaValidate = void 0;
const yup_1 = require("yup");
const userRegisterSchema = (0, yup_1.object)({
    username: (0, yup_1.string)().required(),
    email: (0, yup_1.string)().email().required(),
    password: (0, yup_1.string)().required().min(6),
    retypePassword: (0, yup_1.string)().required().min(6)
});
const userLoginSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().email().required(),
    password: (0, yup_1.string)().required().min(6),
});
const userRegisterSchemaValidate = (req, res, next) => {
    userRegisterSchema
        .validate(req.body)
        .then(() => next())
        .catch((err) => next({
        status: 400,
        message: err.message,
    }));
};
exports.userRegisterSchemaValidate = userRegisterSchemaValidate;
const userLoginSchemaValidate = (req, res, next) => {
    userLoginSchema
        .validate(req.body)
        .then(() => next())
        .catch((err) => next({
        status: 400,
        message: err.message,
    }));
};
exports.userLoginSchemaValidate = userLoginSchemaValidate;
