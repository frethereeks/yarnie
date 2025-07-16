import cloudinary from 'cloudinary';
import { config } from "@/config";
import { assetsFolder } from '@/constants';

cloudinary.v2.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET,
});

export const uploadImage = async (image: File, folder: string = assetsFolder, filePath: string | undefined = undefined): Promise<{ secure_url: string }> => {
    let public_id = "", invalidate = false;
    if (filePath && filePath.includes("cloudinary")) {
        public_id = determineImageParams(filePath).public_id;
        invalidate = determineImageParams(filePath).invalidate
        await deleteImage(public_id)
    }
    const arrayBuffer = await image.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    try {
        const result = new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream({ folder, public_id, invalidate }, (error, file) => {
                if (error) reject(error)
                else resolve(file)
            }).end(buffer)
        })
        return result as unknown as { secure_url: string };
    } catch (error) {
        console.error(error);
        throw new Error("Unable to upload file")
    }
};

export const deleteImage = async (imageName: string) => {
    const {public_id} = determineImageParams(imageName)
    // console.log('imageName', imageName, 'publicId', publicId)
    try {
        await cloudinary.v2.uploader.destroy(public_id, {invalidate: true});
        return { error: false, message: `Image deleted successfully.`, }
    } catch (error) {
        console.error(error);
        return { error: true, message: `Unable to delete image.`, }
    }
};

export const determineImageParams = (imageName: string) => {
    const public_id = imageName.includes("cloudinary") ? imageName.split("/").slice(-1).join("").split(".")[0] : "";
    const invalidate = imageName.includes("cloudinary") ? true : false;
    return { public_id, invalidate };
}