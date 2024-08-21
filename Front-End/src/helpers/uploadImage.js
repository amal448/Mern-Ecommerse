const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`;
import axios from 'axios';

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "mern-product");

    try {
        const DataResponse = await axios.post(url, formData);
        console.log(DataResponse);
        return DataResponse;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;
