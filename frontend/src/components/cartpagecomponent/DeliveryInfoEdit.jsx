import React from 'react'

export default function DeliveryInfoEdit() {
  return (
        <div className="bg-white p-8 pb-12 rounded-xl shadow-sm ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Delivery Information</h2>
        <button className="text-sm bg-gray-200 text-gray-800 px-4 py-1 rounded-md hover:bg-gray-300">
          Save Information
        </button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name<span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="Type here..." className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="Type here..." className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address<span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="Type here..." className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City/ Town<span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="Type here..." className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Zip Code<span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="Type here..." className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile<span className="text-red-500">*</span>
          </label>
          <input type="text" placeholder="Type here..." className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input type="email" placeholder="Type here..." className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black" />
        </div>
      </form>
    </div>
  )
}
