export const config = {
    APP_NAME: "Yarnie",
    APP_DESCRIPTION: "The Yarnie is all about a crochet making, crochet making is the process of creating fabric or other similar items using a crochet hook to interlock loops of yarn, thread, or other materials. It's a versatile craft that can be used to make a wide variety of items, from clothing and accessories to home décor and toys.",
    APP_PRIMARY_API_BASE_URL: process.env.NEXT_PUBLIC_APP_PRIMARY_API_BASE_URL || "http://localhost:3001/",
    APP_PRIMARY_API_REFRESH_TOKEN_KEY: "jwt", //has to be in sync with api
    APP_PRIMARY_API_ACCESS_TOKEN_KEY: "accessToken", //does not have to be in sync with api
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "YARNIE_9ax8X6z1qzt",
    FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID || "",
    FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    TOKEN_ENCRYPTION_KEY: process.env.TOKEN_ENCRYPTION_KEY || "Uwz0^axz!12i9a%yaxp0w",
    BANKER: {
        ACCOUNT_NAME: process.env.NEXT_PUBLIC_ACCOUNT_NAME,
        ACCOUNT_NUMBER: process.env.NEXT_PUBLIC_ACCOUNT_NUMBER,
        ACCOUNT_HOLDER: process.env.NEXT_PUBLIC_ACCOUNT_HOLDER,
    },
    CLOUDINARY: {
        API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "whatevzbro", //look into not exposing this values wither via api endpoint or next ....
        UPLOAD_PRESET:
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "egfpi8od",
        CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dnl81n8vu",
        API_SECRET: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || "sssshhhhh"
    },
    NEXT_MAIL: {
        HOST: process.env.NEXT_MAIL_HOST,
        PORT: process.env.NEXT_MAIL_PORT,
        USERNAME: process.env.NEXT_MAIL_USERNAME,
        PASSWORD: process.env.NEXT_MAIL_PASSWORD,
        RECEIVER: process.env.NEXT_MAIL_RECEIVER,
        NOREPLY: process.env.NEXT_MAIL_NOREPLY,
        FROM: process.env.NEXT_MAIL_USERNAME,
        BCC: process.env.NEXT_MAIL_BCC,
    },
}