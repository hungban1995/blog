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
        const image = {
            url,
            uploadBy
        }
        await service.upload(image)
        res.status(200).json('Upload image success!')
    } catch (err) {
        next(err)
    }
}
export const getAll: functionType = async (req, res, next) => {
    try {
        const images: any = await service.findImages({})
        if (images.length === 0) return next({ status: 404, message: 'Images not found!' })

        res.status(200).json({ success: true, message: 'Get images success!', images })

    } catch (error) {
        next(error)
    }
}

export const getId: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const images: any = await service.findImages({ id: Number(id) })
        if (images.length === 0) return next({ status: 404, message: 'Image not found!' })
        res.status(200).json({ success: true, message: 'Get images success!', images: images[0] })

    } catch (error) {
        next(error)
    }
}
export const deleteImage: functionType = async (req, res, next) => {
    try {
        const { id } = req.params
        const images: any = await service.findImages({ id: Number(id) })
        if (images.length === 0) return next({ status: 404, message: 'Image not found!' })
        const accessToken = req.headers.authorization as string
        const decode = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as decodeType

        if (decode.id.toString() !== images[0].uploadBy && decode.role !== 'admin') return next({ status: 403, message: "You don't have permission delete this image!" })
        const PATH = "./public/" + images[0].url;
        const fsDelete: any = fs.unlink(PATH, (err) => {
            if (err) {
                return { error: err };
            }
        });
        if (fsDelete && fsDelete.error) {
            return next(fsDelete.error);
        }
        await service.deleteImage(Number(id))
        res.status(200).json({ success: true, message: "Delete image success!" })

    } catch (error) {
        next(error)
    }
}