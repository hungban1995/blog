import { decodeType, functionType } from '../helpers/type'
import { verifyToken } from '../middleware/auth'
import * as service from '../service/images.service'
import fs from "fs";

export const upload: functionType = async (req, res, next) => {
    try {
        const path = req.file?.destination.slice(9) as string
        const filename = req.file?.filename as string
        const url = `${path}/${filename}`
        const uploadBy: number = req.body.user
        const imageUpload = {
            url,
            uploadBy
        }
        await service.upload(imageUpload)
        res.status(200).json({ success: true, message: 'Upload image success!', url })
    } catch (err) {
        next(err)
    }
}
export const getAll: functionType = async (req, res, next) => {
    try {
        const { page } = req.query
        const limit = 5;
        const offset = (Number(page) - 1) * limit;
        const images: any = await service.getAll(limit, offset)

        res.status(200).json({ success: true, message: 'Get images success!', images })

    } catch (error) {
        next(error)
    }
}

export const getId: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const images: any = await service.findImages({ id: id }, null)
        if (images.length === 0) return next({ status: 404, message: 'Image not found!' })
        res.status(200).json({ success: true, message: 'Get images success!', images: images[0] })

    } catch (error) {
        next(error)
    }
}
export const deleteImage: functionType = async (req, res, next) => {
    try {
        const ids = req.body
        const images: any = await service.findImages({}, ids)
        if (images.length === 0) return next({ status: 404, message: 'Image not found!' })
        const accessToken = req.headers.authorization as string
        await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType
        for (let i of images) {
            const PATH = "./public/" + i.url;
            const fsDelete: any = fs.unlink(PATH, (err) => {
                if (err) {
                    return { error: err };
                }
            });
            if (fsDelete && fsDelete.error) {
                return next(fsDelete.error);
            }
        }
        await service.deleteImage(ids)
        res.status(200).json({ success: true, message: "Delete image success!" })

    } catch (error) {
        next(error)
    }
}