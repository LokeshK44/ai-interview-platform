import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

const questions = [
  'How would you approach solving a problem you have never encountered before in your field?',
  'What is your greatest strength, and how does it help you in your work?',
  'Describe a challenging situation you faced and how you resolved it.',
];

const Question: React.FC = () => {
  const router = useRouter();
  const { index } = router.query; // Get current question index
  const questionIndex = parseInt(index as string, 10) || 0; // Default to 0
  const [isSpeaking, setIsSpeaking] = useState(false);
  const question = questions[questionIndex];

  // Text-to-Speech Function
  const speakQuestion = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        router.push({
          pathname: '/response',
          query: { index: questionIndex }, // Pass the current question index
        });
      };
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-Speech is not supported in this browser.');
    }
  }, [router, questionIndex]);

  // Play the question audio once when the page loads
  useEffect(() => {
    speakQuestion(question);
  }, [speakQuestion, question]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Question Section */}
      <div className="bg-gray-800 text-center rounded-lg p-6 shadow-lg max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{question}</h1>
        <p className="text-gray-400">Question {questionIndex + 1}/{questions.length}</p>
      </div>

      {/* Audio Status */}
      <div className="mt-8">
        {isSpeaking ? (
          <p className="text-green-400 font-semibold">Playing question...</p>
        ) : (
          <p className="text-gray-400">Redirecting to response page...</p>
        )}
      </div>
    </div>
  );
};

export default Question;
