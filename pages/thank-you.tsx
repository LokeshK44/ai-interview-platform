import React, { useEffect } from 'react'; // Add useEffect to the import
import { useRouter } from 'next/router';

const ThankYou: React.FC = () => {
  const router = useRouter();
  const { index } = router.query; // Get the current question index
  const nextIndex = parseInt(index as string, 10) || 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nextIndex === -1) {
        router.push('/feedback'); // Redirect to Feedback Page after the last question
      } else {
        router.push({
          pathname: '/response',
          query: { index: nextIndex },
        });
      }
    }, 3000); // Delay for 3 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [router, nextIndex]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Thank you!</h1>
      <p className="text-gray-400 text-lg">Preparing the next question...</p>
    </div>
  );
};

export default ThankYou;
