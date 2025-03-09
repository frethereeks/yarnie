import { config } from "@/config";
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET,
});



export async function POST(request: Request) {
    const body = (await request.json()) as { paramsToSign: Record<string, string> } 
    const { paramsToSign } = body;

    // signature
    const signature = cloudinary.utils.api_sign_request(paramsToSign, config.CLOUDINARY.API_SECRET)
    return Response.json({signature})
}