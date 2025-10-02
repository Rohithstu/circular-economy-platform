import React, { useState } from 'react';

const ListMaterialPage = ({ user, setCurrentPage, openAuthModal, API_BASE_URL }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    unit: '',
    price: '',
    isFree: false,
    location: '',
    images: [] // Changed from image to images array
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);

  // ✅ Check if user can list materials
  const canListMaterial = user && (user.role === 'seller' || user.role === 'both');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle multiple image uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    
    try {
      const uploadedImages = [];
      
      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError('Please select only image files');
          continue;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          setError('Image size should be less than 5MB');
          continue;
        }

        // Convert image to base64
        const imageUrl = await convertToBase64(file);
        uploadedImages.push(imageUrl);
      }

      // Add new images to existing ones
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
      
      setError('');
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Error uploading images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  // Remove image from the list
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      openAuthModal('login');
      return;
    }

    // ✅ Check if user has permission
    if (!canListMaterial) {
      setError('Only sellers can list materials. Please contact admin to change your role.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      
      // ✅ Use the correct API endpoint and ensure imageUrl is set
      const response = await fetch(`${API_BASE_URL}/api/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          // ✅ Use the first image as imageUrl for MaterialCard compatibility
          imageUrl: formData.images.length > 0 ? formData.images[0] : '',
          images: formData.images, // ✅ Keep all images
          userId: user.id,
          company: user.company,
          sellerName: user.name // ✅ Add seller name for display
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Material listed successfully!');
        setFormData({
          title: '',
          description: '',
          category: '',
          quantity: '',
          unit: '',
          price: '',
          isFree: false,
          location: '',
          images: []
        });
      } else {
        setError(data.error || 'Failed to list material');
      }
    } catch (error) {
      console.error('Error listing material:', error);
      setError('Failed to list material. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Show access denied for non-sellers
  if (user && !canListMaterial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-green-100">
            <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h3>
            <p className="text-gray-600 mb-4">
              Only sellers can list materials. Your current role is <span className="font-semibold text-red-600">"{user.role}"</span>.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Please contact administrator to change your role to "seller" or "both".
            </p>
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg"
            >
              Back to Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-green-100">
            <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h3>
            <p className="text-gray-600 mb-6">You need to be logged in to list materials on our platform.</p>
            <button
              onClick={() => openAuthModal('login')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">List New Material</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your materials with the EcoTrade community. Help reduce waste and create sustainable value chains.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Material Information</h2>
            <p className="text-green-100 text-sm">Fill in the details about your material</p>
          </div>

          {/* Form Content */}
          <div className="px-6 py-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Material Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Industrial Wood Pallets"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      <option value="Wood">Wood</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Metal">Metal</option>
                      <option value="Paper">Paper</option>
                      <option value="Textile">Textile</option>
                      <option value="Electronic">Electronic</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                        min="1"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="100"
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                        Unit *
                      </label>
                      <select
                        id="unit"
                        name="unit"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        value={formData.unit}
                        onChange={handleChange}
                      >
                        <option value="">Select unit</option>
                        <option value="kg">Kilograms (kg)</option>
                        <option value="lbs">Pounds (lbs)</option>
                        <option value="pallets">Pallets</option>
                        <option value="boxes">Boxes</option>
                        <option value="units">Units</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., San Francisco, CA"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <input
                      id="isFree"
                      name="isFree"
                      type="checkbox"
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      checked={formData.isFree}
                      onChange={handleChange}
                    />
                    <label htmlFor="isFree" className="text-sm font-medium text-gray-700">
                      This material is free
                    </label>
                  </div>

                  {!formData.isFree && (
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price (per unit) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">$</span>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          min="0"
                          step="0.01"
                          required
                          className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  placeholder="Describe your material in detail..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Multiple Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images ({formData.images.length}/10)
                </label>
                
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors duration-200">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImages || formData.images.length >= 10}
                  />
                  <label 
                    htmlFor="image-upload" 
                    className={`cursor-pointer flex flex-col items-center justify-center space-y-2 ${
                      (uploadingImages || formData.images.length >= 10) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <span className="text-green-600 font-medium">Click to upload</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB each (max 10 images)
                    </p>
                  </label>
                  
                  {uploadingImages && (
                    <div className="mt-4 flex items-center justify-center text-green-600">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading images...
                    </div>
                  )}
                </div>

                {/* Preview Uploaded Images */}
                {formData.images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Preview ({formData.images.length} images)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading || uploadingImages}
                  className="bg-green-700 w-full max-w-md bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Listing Material...
                    </span>
                  ) : (
                    'List Material on Marketplace'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            By listing your material, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListMaterialPage;