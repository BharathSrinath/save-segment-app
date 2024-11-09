import React, { useState } from 'react';
import axios from 'axios';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const Popup = ({ onClose }) => {
  
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);
  const [dropdownValue, setDropdownValue] = useState('');

  const handleAddSchema = (value) => {
    if (!segmentName) {
      alert('Please enter a segment name before adding a schema.');
      setDropdownValue('');
      return;
    }

    const option = schemaOptions.find((opt) => opt.value === value);
    if (!option) return;

    setSelectedSchemas([...selectedSchemas, { ...option, segmentValue: segmentName }]);
    setAvailableOptions(availableOptions.filter((opt) => opt.value !== value));

    setSegmentName('');
    setDropdownValue('');
  };

  const handleSaveSegment = async () => {

    if (selectedSchemas.length === 0) {
      alert('Please add at least one schema.');
      return;
    }
  
    const schemaData = selectedSchemas.map((schema) => ({
      [schema.value]: schema.segmentValue,
    }));
  
    const data = {
      segment_name: segmentName || "last_10_days_blog_visits",
      schema: schemaData,
    };
  
    try {
      await axios.post('https://webhook.site/1ce00295-4d88-4037-8eae-d27325a9396c', data);
      alert('Segment saved successfully!');
    } catch (error) {
      alert('Error saving segment.');
    }
  
    onClose();

  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Saving Segment</h2>
        <input
          type="text"
          placeholder="Name of the segment"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />

        <div className="bg-blue-50 border border-blue-300 rounded p-4 mb-4">
          {selectedSchemas.map((schema, index) => (
            <div key={index} className="mb-2">
              {schema.label}: {schema.segmentValue}
            </div>
          ))}

          <select
            className="w-full border border-gray-300 rounded p-2 mb-2"
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
          >
            <option value="" disabled>
              Add schema to segment
            </option>
            {availableOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            className="text-teal-500 hover:text-teal-600"
            onClick={() => handleAddSchema(dropdownValue)}
          >
            +Add new schema
          </button>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            onClick={handleSaveSegment}
          >
            Save the Segment
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
