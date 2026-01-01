import React, { useEffect, useState } from "react";
import { getCountries } from "../api/countries";
import { updateTax } from "../api/taxes";

export default function EditModal({ tax, onClose, onUpdate }) {
  const [name, setName] = useState(tax.entity || tax.name || "");
  const [countryId, setCountryId] = useState(tax.countryId || "");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries().then(setCountries);
  }, []);

  const handleSave = async () => {
    const updated = await updateTax(tax.id, {
      ...tax,
      entity: name,
      countryId: countryId,
    });

    onUpdate(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Customer
          </h2>

          <button
            onClick={onClose}
            className="text-white hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-gray-800 bg-white"
            placeholder="Enter name"
          />
        </div>

        {/* Country */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Country
          </label>
          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-indigo-500
                       text-gray-800 bg-white"
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md
                      border border-red-500
                      text-white-600 font-medium
                      hover:bg-red-50
                      hover:text-red-700
                      transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-md bg-indigo-600
                       text-white font-medium hover:bg-indigo-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
