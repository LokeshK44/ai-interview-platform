import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const questions = [
  'How would you approach solving a problem you have never encountered before in your field?',
  'What is your greatest strength, and how does it help you in your work?',
  'Describe a challenging situation you faced and how you resolved it.',
];

const Response: React.FC = () => {
  const [timer, setTimer] = useState(60); // Set timer to 60 seconds
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { index } = router.query; // Get current question index
  const questionIndex = parseInt(index as string, 10) || 0;
  const question = questions[questionIndex];

  // Start Webcam Feed
  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error(err); // Log the error
        alert('Unable to access the camera. Please check permissions.');
      }
    };
    startWebcam();
  }, []);

  // Start Timer when the page is loaded
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup the timer when the component is unmounted
    return () => clearInterval(countdown);
  }, []);

  // Automatically handle when the timer reaches 0
  useEffect(() => {
    if (timer === 0) {
      handleSaveAndNext(); // Trigger Save & Next automatically
    }
  }, [timer, handleSaveAndNext]); // Added handleSaveAndNext to the dependency array

  // Save & Next Button Handler
  const handleSaveAndNext = () => {
    const nextIndex = questionIndex + 1;

    if (nextIndex < questions.length) {
      // Redirect to the next question
      router.push({
        pathname: '/question',
        query: { index: nextIndex },
      });
    } else {
      // Redirect to Feedback Page if all questions are answered
      router.push('/feedback');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Timer */}
      <div className="absolute top-6 right-6 bg-gray-800 px-4 py-2 rounded-lg">
        <p className="text-lg font-semibold">Time Left: {timer}s</p>
      </div>

      {/* Display Question */}
      {question && (
        <div className="bg-gray-800 text-center rounded-lg p-6 shadow-lg max-w-3xl mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">{question}</h1>
        </div>
      )}

      {/* Enlarged Webcam Feed */}
      <div className="bg-black rounded-lg overflow-hidden w-80 h-60 shadow-lg mb-6">
        <video ref={videoRef} className="w-full h-full" muted></video>
      </div>

      {/* Save & Next Button */}
      <button
        onClick={handleSaveAndNext}
        className="w-64 py-3 rounded-lg shadow-lg transition font-semibold bg-purple-600 hover:bg-purple-700 text-white"
      >
        Save & Next
      </button>

      {/* Instruction for Pressing "Enter" */}
      <p className="mt-4 text-gray-400 text-sm">Press "Enter" for saving and next</p>
    </div>
  );
};

export default Response;
