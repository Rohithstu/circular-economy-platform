import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload, existingImage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(existingImage);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      setImageUrl(data.url);
      onImageUpload(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="image-upload">
      {imageUrl ? (
        <div className="relative">
          <img src={imageUrl} alt="Uploaded" className="w-full h-48 object-cover rounded" />
          <button
            onClick={() => setImageUrl(null)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
          >
            ×
          </button>
        </div>
      ) : (
        <label className="cursor-pointer">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {isUploading ? (
              <div>Uploading...</div>
            ) : (
              <>
                <div className="text-gray-400 mb-2">Click to upload image</div>
                <div className="text-sm text-gray-500">PNG, JPG up to 10MB</div>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;