import React from 'react';

export default function LoginPopUp({ message, onConfirm, onCancel}) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm ">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm relative animate-fade-in">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Notice</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end gap-2">
   
              <button
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={onCancel}
              >
                cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700"
                onClick={onConfirm}
                autoFocus
              >
                LogIn
              </button>
        </div>
      </div>
    </div>
  );
} 