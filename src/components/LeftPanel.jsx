/* eslint-disable react/prop-types */

const LeftPanel = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-gray-900 shadow-lg transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center bg-gray-700 text-white border-b">
        <h2 className="text-lg font-semibold">User Details</h2>
        <button
          onClick={onClose}
          className="hover:text-red-500 font-bold text-xl"
        >
          ×
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default LeftPanel;
