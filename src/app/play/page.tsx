// src/app/play/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import ColoredSquare from '../../components/ColoredSquare';
import { useRouter } from 'next/navigation';

const COLORS = ['red-500', 'green-500', 'blue-500', 'yellow-400'];

export default function Play() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  // Load sequence from localStorage on mount
  useEffect(() => {
    const storedSequence = localStorage.getItem('memorySequence');
    if (storedSequence) {
      setSequence(JSON.parse(storedSequence));
    } else {
      setMessage('No sequence found. Please go back and start a new game.');
    }
  }, []);

  // Handle user click on square
  const handleClick = (colorIndex: number) => {
    if (message) return; // no input if game ended or error

    const nextInput = [...userInput, colorIndex];
    setUserInput(nextInput);

    // Check if input matches sequence so far
    for (let i = 0; i < nextInput.length; i++) {
      if (nextInput[i] !== sequence[i]) {
        setMessage('Wrong sequence! Try again.');
        return;
      }
    }

    // Check if user completed sequence correctly
    if (nextInput.length === sequence.length) {
      setMessage('Congrats! You got it right! 🎉');
    }
  };

  // Restart game
  const restart = () => {
    router.push('/');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-3xl font-bold">Repeat the Sequence</h1>
      <div className="flex gap-6">
        {COLORS.map((color, idx) => (
          <ColoredSquare
            key={idx}
            color={color}
            onClick={() => handleClick(idx)}
          />
        ))}
      </div>

      <p className="mt-6 text-xl">{message}</p>

      <button
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={restart}
      >
        Restart
      </button>
    </main>
  );
}
