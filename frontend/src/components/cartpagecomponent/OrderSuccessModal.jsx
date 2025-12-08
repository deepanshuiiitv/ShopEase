import React, { useEffect, useState } from "react";
import "./OrderSuccessModal.css"; // Import custom styles

export default function OrderSuccessModal({ onClose, transactionId }) {
  const [visible, setVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
      setShowConfetti(true);
    }, 20);
    
    // Stop confetti after 3 seconds
    const confettiTimeout = setTimeout(() => setShowConfetti(false), 3000);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(confettiTimeout);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blur bg-opacity-30 backdrop-blur-sm transition-opacity duration-300">
      {/* Enhanced confetti animation */}
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(150)].map((_, i) => (
            <div 
              key={i}
              className={`confetti confetti-${i % 10}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`
              }}
            />
          ))}
        </div>
      )}

      <div
        className={`bg-white rounded-3xl shadow-lg text-center p-8 max-w-md w-full space-y-6 transform transition-all duration-300 relative overflow-hidden ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Floating celebration emojis */}
        {showConfetti && (
          <>
            <div className="celebration-emoji" style={{ top: '10%', left: '20%', animationDelay: '0.1s' }}>🎉</div>
            <div className="celebration-emoji" style={{ top: '15%', right: '25%', animationDelay: '0.3s' }}>✨</div>
            <div className="celebration-emoji" style={{ bottom: '20%', left: '15%', animationDelay: '0.5s' }}>🎉</div>
            <div className="celebration-emoji" style={{ bottom: '15%', right: '20%', animationDelay: '0.7s' }}>✨</div>
          </>
        )}

        {/* Checkmark with pulse animation */}
        <div className="flex justify-center relative z-10">
          <div className="rounded-full bg-green-100 p-4 animate-pulse">
            <svg
              className="w-16 h-16 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-semibold">Order Successful! 🎉</h2>
          <p className="text-gray-600 mt-2">Transaction ID: {transactionId}</p>
          <p className="text-green-500 font-medium mt-2">Thank you for your purchase!</p>
        </div>

        <button
          onClick={handleClose}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition transform hover:scale-105 relative z-10"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}