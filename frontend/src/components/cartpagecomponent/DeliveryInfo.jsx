
export default function DeliveryInfo({ onToggleEdit }) {
  return (
    <div>
      <span className="text-sm font-medium text-gray-700">
        Check Information Below
      </span>
      <div className="bg-white rounded-xl shadow-sm p-6 mt-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Delivery Information</h3>
          <button
            className="text-sm px-3 py-1 border rounded-md hover:bg-gray-100"
            onClick={onToggleEdit}
          >
            Edit
          </button>
        </div>
        <p className="mt-4 font-medium">Aditya Narayan</p>
        <p className="text-gray-600 text-sm">9662 Deva road Dhava,Lucknow UP</p>
        <p className="text-sm text-gray-600">+91854947865</p>
        <p className="text-sm text-gray-600">adityaa@gmail.com</p>
      </div>
    </div>
  );
}
