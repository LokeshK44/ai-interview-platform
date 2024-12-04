import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Feedback: React.FC = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);
  const router = useRouter();

  const handleFeedbackSubmit = () => {
    if (selectedFeedback !== null) {
      router.push('/feedback-success'); // Redirect to the success page
    } else {
      alert('Please select a feedback option before submitting.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Congratulations Message */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Congratulations! 🎉 <br />
        You have completed your interview.
      </h1>

      {/* Feedback Prompt */}
      <h2 className="text-xl font-semibold mb-4 text-gray-300">
        We’d love to hear about your experience. How would you rate it?
      </h2>

      {/* Feedback Options */}
      <div className="flex space-x-4 mb-6">
        {['😡', '😕', '😐', '😊', '🤩'].map((emoji, index) => (
          <button
            key={index}
            onClick={() => setSelectedFeedback(index + 1)}
            className={`text-4xl p-4 rounded-lg transition ${
              selectedFeedback === index + 1
                ? 'bg-purple-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Submit Feedback Button */}
      <button
        onClick={handleFeedbackSubmit}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-semibold"
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;
