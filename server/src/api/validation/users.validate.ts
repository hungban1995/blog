import { object, string, number, date, InferType } from 'yup';
import { functionType } from '../helpers/type';

const userRegisterSchema = object({
    username: string().required(),
    email: string().email().required(),
    password: string().required().min(6),
    retypePassword: string().required().min(6)
});
const userLoginSchema = object({

    email: string().email().required(),
    password: string().required().min(6),

});
export const userRegisterSchemaValidate: functionType = (req, res, next) => {
    userRegisterSchema
        .validate(req.body)
        .then(() => next())
        .catch((err) =>
            next({
                status: 400,
                message: err.message,
            })
        );
};
export const userLoginSchemaValidate: functionType = (req, res, next) => {
    userLoginSchema
        .validate(req.body)
        .then(() => next())
        .catch((err) =>
            next({
                status: 400,
                message: err.message,
            })
        );
};