import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const spinnerSize = sizeMap[size] || sizeMap['md']; 

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${spinnerSize} animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}
      />
    </div>
  );
};

export default Loader;
