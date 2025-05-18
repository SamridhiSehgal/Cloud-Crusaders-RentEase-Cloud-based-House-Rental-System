import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    location: '',
    rentPrice: '',
    parking: false,
    wifi: false,
    purifier: false,
    airConditioner: false,
    bhk: 1,
    length: '',
    width: '',
    floorStatus: '',
    areaType: '',
    state: '',
    district: '',
    city: '',
    areaLocality: '',
    furnishing: 'Unfurnished',
    bathrooms: '',
    tenantType: 'Owner',
  });

  const [imageLinks, setImageLinks] = useState(['']);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (index, value) => {
    const links = [...imageLinks];
    links[index] = value;
    setImageLinks(links);
  };

  const addImageField = () => setImageLinks((prev) => [...prev, '']);
  const removeImageField = (index) =>
    setImageLinks((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData, images: imageLinks };
    console.log('Submitting form:', payload);
    // TODO: Send this to backend
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Add New Property</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="block font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
                required
              />
            </div>

            {/* Rent Price */}
            <div>
              <label className="block font-medium mb-2">Rent Price</label>
              <input
                type="number"
                name="rentPrice"
                value={formData.rentPrice}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
                required
              />
            </div>

            {/* Facilities Checkboxes */}
            <div className="sm:col-span-2">
              <label className="block font-medium mb-2">Facilities</label>
              <div className="flex flex-wrap gap-4">
                {['parking', 'wifi', 'purifier', 'airConditioner'].map((key) => (
                  <label key={key} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                      className="mr-2 accent-blue-500"
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* BHK */}
            <div>
              <label className="block font-medium mb-2">BHK</label>
              <select
                name="bhk"
                value={formData.bhk}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} BHK
                  </option>
                ))}
              </select>
            </div>

            {/* Dimensions */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium mb-2">Length</label>
                <input
                  type="number"
                  name="length"
                  value={formData.length}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded border border-gray-600"
                  placeholder="e.g. 400"
                />
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-2">Width</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded border border-gray-600"
                  placeholder="e.g. 300"
                />
              </div>
            </div>

            {/* Floor Status */}
            <div>
              <label className="block font-medium mb-2">Floor Status</label>
              <input
                type="text"
                name="floorStatus"
                value={formData.floorStatus}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              />
            </div>

            {/* Area Type */}
            <div>
              <label className="block font-medium mb-2">Area Type</label>
              <input
                type="text"
                name="areaType"
                value={formData.areaType}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              />
            </div>

            {/* State/District/City */}
            {['state', 'district', 'city'].map((field) => (
              <div key={field}>
                <label className="block font-medium mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 rounded border border-gray-600"
                />
              </div>
            ))}

            {/* Area Locality */}
            <div className="sm:col-span-2">
              <label className="block font-medium mb-2">Area Locality</label>
              <input
                type="text"
                name="areaLocality"
                value={formData.areaLocality}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              />
            </div>

            {/* Furnishing */}
            <div>
              <label className="block font-medium mb-2">Furnishing</label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              >
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 rounded border border-gray-600"
              />
            </div>

            {/* Tenant Type */}
            <div className="sm:col-span-2">
              <label className="block font-medium mb-2">Tenant Type</label>
              <div className="flex gap-4">
                {['Owner', 'Agent'].map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="tenantType"
                      value={type}
                      checked={formData.tenantType === type}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Image Uploads */}
            <div className="sm:col-span-2">
              <label className="block font-medium mb-2">Image Links</label>
              {imageLinks.map((link, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => handleImageChange(idx, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1 p-3 bg-gray-700 rounded border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => removeImageField(idx)}
                    className="bg-red-600 px-3 rounded text-white hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImageField}
                className="mt-2 bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500"
              >
                Add Image
              </button>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-green-600 px-6 py-3 rounded-lg text-white hover:bg-green-500"
              >
                Submit Property
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddProperty;
