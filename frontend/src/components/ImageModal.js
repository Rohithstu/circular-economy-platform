// components/ImageModal.js
import React, { useState, useEffect } from 'react';

const ImageModal = ({ material, initialImageIndex, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);

  const getImages = () => {
    const images = [];
    if (material.imageUrl) images.push(material.imageUrl);
    if (material.images && material.images.length > 0) {
      images.push(...material.images);
    }
    return images.length > 0 ? images : ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'];
  };

  const images = getImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition duration-200"
        >
          ×
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition duration-200 z-10"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition duration-200 z-10"
            >
              ›
            </button>
          </>
        )}

        {/* Main Image */}
        <div className="flex flex-col items-center max-w-4xl max-h-full">
          <img
            src={images[currentImageIndex]}
            alt={material.title}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          
          {/* Image Counter */}
          <div className="text-white mt-4 text-lg">
            {currentImageIndex + 1} / {images.length}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex space-x-2 mt-4 overflow-x-auto max-w-full pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 transition duration-200 ${
                    index === currentImageIndex ? 'border-green-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center bg-black/50 rounded-lg p-4 max-w-md">
          <h3 className="text-xl font-bold mb-2">{material.title}</h3>
          <p className="text-green-400 text-2xl font-bold">${material.price || '0'}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;