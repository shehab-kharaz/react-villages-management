import axios from "axios";

const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

export const uploadImageToCloudinary = async (imageFile) => {

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    if (response.data.secure_url) {
      return response.data.secure_url;  
    } else {
      throw new Error("Cloudinary upload failed");
    }
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary: " + error.message);
  }
};
