const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { protect } = require('../middleware/auth');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload image
router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'ecotrade',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { format: 'auto' }
      ]
    });

    // Clean up temporary file
    fs.unlinkSync(req.file.path);

    res.json({ 
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete image
router.delete('/image', protect, async (req, res) => {
  try {
    const { publicId } = req.body;
    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;