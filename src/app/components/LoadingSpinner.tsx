'useClient';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center space-x-2 loading-spinner">
      <span className="loading loading-spinner loading-lg"></span>
      <div className="w-10 h-10 border-4 border-t-4 border-l-white border-gray-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
