import React from 'react';
import { useRouter } from 'next/router';

const FeedbackSuccess: React.FC = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/'); // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <div className="text-green-500 text-5xl mb-4">✔</div>
        <h1 className="text-2xl font-bold mb-4">Feedback Submitted Successfully</h1>
        <p className="text-gray-400 mb-6">Thank you for your feedback!</p>
        <button
          onClick={handleBackToHome}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default FeedbackSuccess;
