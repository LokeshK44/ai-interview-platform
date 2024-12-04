import React, { useState } from 'react';

const Instruction: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleStartExam = () => {
    setShowLoginModal(true); // Show the login modal
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false); // Hide the login modal
    window.location.href = '/permissions'; // Redirect to the next step (permissions page)
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Instructions */}
      <div className="bg-gray-800 text-center rounded-lg p-6 shadow-lg max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Instructions</h1>
        <ol className="text-left text-gray-300 space-y-2">
          <li>1. Ensure a stable internet connection and choose a quiet location.</li>
          <li>2. Allow access to your camera, microphone, and screen sharing.</li>
          <li>3. Be in professional attire and avoid distractions.</li>
          <li>4. Give detailed responses to all questions.</li>
          <li>5. Stay focused and complete the interview on time.</li>
        </ol>
        <button
          onClick={handleStartExam}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg"
        >
          Start Exam
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Are you ready to start working towards your career goals?</h2>
            <button
              onClick={handleLoginSuccess}
              className="mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full flex items-center justify-center"
            >
              <span className="mr-2">🔵</span> Login with Google
            </button>
            <p className="text-gray-400">OR</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-4 w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            />
            <button
              onClick={handleLoginSuccess}
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg w-full"
            >
              Continue
            </button>
            <p className="mt-4 text-gray-500 text-sm">
              By continuing, you agree to our <span className="text-blue-400 underline">Terms</span> and{' '}
              <span className="text-blue-400 underline">Privacy Policy</span>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instruction;
