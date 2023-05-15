import multer from 'multer';
import { verifyToken } from './auth';
import fs from 'fs';
import moment from 'moment';
import { decodeType } from '../helpers/type';

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            const accessToken = req.headers.authorization as string
            const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
            req.body.user = decode.id
            const dateTime = `${moment().format('MM-yyyy')}`;
            const PATH = `./public/uploads/${dateTime}`
            if (!fs.existsSync(PATH)) {
                fs.mkdirSync(PATH, { recursive: true });
            }
            cb(null, PATH)
        } catch (error: any) {
            return cb(error, '')
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

export const upload = multer({ storage: storage }).single("image")