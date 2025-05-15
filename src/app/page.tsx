"use client";

import { useState, useEffect } from 'react';

const colors = ['red', 'blue', 'green', 'yellow'] as const;
type Color = typeof colors[number];

export default function Home() {
  const [gameSequence, setGameSequence] = useState<Color[]>([]);
  const [userSequence, setUserSequence] = useState<Color[]>([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [message, setMessage] = useState('');
  const [activeColor, setActiveColor] = useState<Color | null>(null);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const startGame = async () => {
    setMessage('');
    const newSequence: Color[] = [];
    setGameSequence(newSequence);
    setUserSequence([]);
    await nextRound(newSequence);
  };

  const nextRound = async (sequence: Color[]) => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    const updatedSequence = [...sequence, newColor];
    setGameSequence(updatedSequence);
    setUserSequence([]);
    setIsUserTurn(false);
    await showSequence(updatedSequence);
    setIsUserTurn(true);
  };

  const showSequence = async (sequence: Color[]) => {
    for (const color of sequence) {
      setActiveColor(color);
      await delay(500);
      setActiveColor(null);
      await delay(300);
    }
  };

  const handleColorClick = async (color: Color) => {
    if (!isUserTurn) return;

    const updatedUserSequence = [...userSequence, color];
    setUserSequence(updatedUserSequence);

    const currentStep = updatedUserSequence.length - 1;
    if (color !== gameSequence[currentStep]) {
      setMessage('❌ Wrong! Game Over.');
      setIsUserTurn(false);
      return;
    }

    if (updatedUserSequence.length === gameSequence.length) {
      setMessage('✅ Correct! Next Round...');
      setIsUserTurn(false);
      await delay(1000);
      setMessage('');
      nextRound(gameSequence);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🎯 Color Memory Game</h1>
      <button
        onClick={startGame}
        className="mb-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Start Game
      </button>

      <div className="flex space-x-4 mb-6">
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => handleColorClick(color)}
            className={`
              w-24 h-24 rounded shadow-md cursor-pointer transition-all duration-300
              ${color === 'red' && 'bg-red-500'}
              ${color === 'blue' && 'bg-blue-500'}
              ${color === 'green' && 'bg-green-500'}
              ${color === 'yellow' && 'bg-yellow-400'}
              ${activeColor === color ? 'opacity-100 scale-110' : 'opacity-70'}
            `}
          ></div>
        ))}
      </div>

      <p className="text-xl font-medium">{message}</p>
    </div>
  );
}
