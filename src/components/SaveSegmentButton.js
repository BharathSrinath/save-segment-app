import React, { useState } from 'react';
import Popup from './Popup';

const SaveSegmentButton = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={togglePopup}
        className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
      >
        Save segment
      </button>
      {isPopupVisible && <Popup onClose={togglePopup} />}
    </div>
  );
};

export default SaveSegmentButton;
