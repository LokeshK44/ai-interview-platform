import React, { useState } from 'react';
import Link from 'next/link';

const Permissions: React.FC = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [speakerTested, setSpeakerTested] = useState(false);
  const [screenSharingEnabled, setScreenSharingEnabled] = useState(false);

  // Check Camera and Microphone Permissions
  const checkMediaPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setPermissionsGranted(true);
    } catch (err) {
      alert('Please enable Camera and Microphone permissions!');
    }
  };

  // Test Speaker by Playing Audio
  const testSpeaker = () => {
    const audio = new Audio('/test-audio.mp3'); // Replace with your audio file path
    audio.play();
    setSpeakerTested(true);
  };

  // Enable Screen Sharing
  const enableScreenShare = async () => {
    try {
      await navigator.mediaDevices.getDisplayMedia();
      setScreenSharingEnabled(true);
    } catch (err) {
      alert('Screen sharing is not enabled. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Permissions Check</h1>
      <p className="text-gray-400 mb-12 text-center px-6">
        Before starting the interview, ensure that all permissions are enabled. Test your camera,
        microphone, speakers, and screen-sharing capabilities to proceed.
      </p>

      {/* Permission Buttons */}
      <div className="space-y-6">
        <button
          onClick={checkMediaPermissions}
          className={`w-64 py-3 rounded-lg shadow-lg transition ${
            permissionsGranted
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={permissionsGranted}
        >
          {permissionsGranted ? 'Camera & Microphone Enabled' : 'Check Camera & Microphone'}
        </button>

        <button
          onClick={testSpeaker}
          className={`w-64 py-3 rounded-lg shadow-lg transition ${
            speakerTested
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={speakerTested}
        >
          {speakerTested ? 'Speaker Tested' : 'Test Speaker'}
        </button>

        <button
          onClick={enableScreenShare}
          className={`w-64 py-3 rounded-lg shadow-lg transition ${
            screenSharingEnabled
              ? 'bg-green-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={screenSharingEnabled}
        >
          {screenSharingEnabled ? 'Screen Sharing Enabled' : 'Enable Screen Sharing'}
        </button>
      </div>

      {/* Proceed Button */}
      <div className="mt-12">
        <Link href="/question">
          <button
            className={`w-64 py-3 rounded-lg shadow-lg transition font-semibold ${
              permissionsGranted && speakerTested && screenSharingEnabled
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-600 cursor-not-allowed text-gray-400'
            }`}
            disabled={!permissionsGranted || !speakerTested || !screenSharingEnabled}
          >
            Start Interview
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Permissions;
