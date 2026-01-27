// utils/uploadToCloudinary.js
import axios from "axios";
import toast from "react-hot-toast";

const CLOUD_NAME = "ukonu";
const UPLOAD_PRESET = "africamarketplace";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;


export const useUploadImageToCloudinary = () => {
  const uploadOneToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60_000, // 60 seconds
      });

      return response.data;
    } catch (error) {
      // Axios error handling
      console.log("cloudinary error:", error)
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error?.message ||
          error.response?.statusText ||
          error.message;
        toast.error(message);
      } else {
        console.error("Unexpected error:", error);
        toast.error("Unexpected upload error");
      }
    }
  };

  const uploadManyToCloudinary = async (files: File[]) => {
    try {
      if (!files) {
        throw new Error("No file provided");
      }

      // Multiple files
      if (Array.isArray(files)) {
        const uploadPromises = files.map((file) => uploadOneToCloudinary(file));
        return await Promise.all(uploadPromises);
      }

      // Single file
      return await uploadOneToCloudinary(files);
    } catch (error) {
      toast.error("Image upload failed");
    }
  };
  return {
    uploadOneToCloudinary,
    uploadManyToCloudinary,
  };
};
