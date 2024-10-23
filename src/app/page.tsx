'use client';

import { useState } from 'react';
import TypingTest from '../components/TypingTest';

const Home = () => {
  const [testText] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae velit ex."
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Typing Speed Test</h1>
        <TypingTest testText={testText} />
      </div>
    </div>
  );
};

export default Home;
