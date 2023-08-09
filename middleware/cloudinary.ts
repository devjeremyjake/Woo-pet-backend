import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: process.env.CLOUDINARY_CLOUD_NAME, // Replace with the desired folder name in Cloudinary
        };
    },
});

const cloudinaryParser = multer({ storage: cloudinaryStorage });

export {
    cloudinary,
    cloudinaryParser
};