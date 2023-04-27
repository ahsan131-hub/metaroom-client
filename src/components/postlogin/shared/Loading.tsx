import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 z-50">
      <div className="w-16 h-16 rounded-full border-4 border-t-4 border-gray-600 animate-spin"></div>
    </div>
  );
};

export default Loading;
