import cloudinary from '../config/cloudinary.js';

// Upload image (expects multer single file under 'image')
export const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to base64 data URI
    const mime = file.mimetype || 'image/jpeg';
    const dataUri = `data:${mime};base64,${file.buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'products',
      resource_type: 'image',
    });

    return res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload Image Error:', error);
    return res.status(500).json({ message: 'Failed to upload image' });
  }
};

export default { uploadImage };
