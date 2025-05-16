"use client";

import { useEffect, useState } from 'react';
import Header from "@/components/Header";

const colors = ['red', 'blue', 'green', 'yellow'] as const;
type Color = typeof colors[number];

const colorSounds: Record<Color, string> = {
  red: '/sounds/click.mp3',
  blue: '/sounds/click.mp3',
  green: '/sounds/click.mp3',
  yellow: '/sounds/click.mp3',
};

export default function GamePage() {
  const [gameSequence, setGameSequence] = useState<Color[]>([]);
  const [userSequence, setUserSequence] = useState<Color[]>([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [message, setMessage] = useState('');
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Load high score from localStorage on initial load
  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }
  }, []);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const playSound = (soundPath: string) => {
    const audio = new Audio(soundPath);
    audio.play();
  };

  const startGame = async () => {
    setMessage('');
    setGameOver(false);
    setRound(1);
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
    setIsPlaying(true);
    setMessage(`👀 Round ${round} - Watch closely!`);
    await showSequence(updatedSequence);
    setIsPlaying(false);
    setIsUserTurn(true);
    setMessage(`👉 Round ${round} - Your turn!`);
  };

  const showSequence = async (sequence: Color[]) => {
    for (const color of sequence) {
      setActiveColor(color);
      playSound(colorSounds[color]);
      await delay(500);
      setActiveColor(null);
      await delay(300);
    }
  };

  const handleColorClick = async (color: Color) => {
    if (!isUserTurn || isPlaying) return;

    playSound(colorSounds[color]);

    const updatedUserSequence = [...userSequence, color];
    setUserSequence(updatedUserSequence);

    const currentStep = updatedUserSequence.length - 1;
    if (color !== gameSequence[currentStep]) {
      playSound('/sounds/gameover.mp3');
      const finalRound = round - 1;

      setMessage(`❌ Wrong! Game Over. You passed ${finalRound} round(s).`);
      setIsUserTurn(false);
      setGameOver(true);

      // Save high score if beaten
      if (finalRound > highScore) {
        setHighScore(finalRound);
        localStorage.setItem('highScore', finalRound.toString());
      }

      // Store round history
      const history = JSON.parse(localStorage.getItem('roundHistory') || '[]');
      history.push(finalRound);
      localStorage.setItem('roundHistory', JSON.stringify(history));

      return;
    }

    if (updatedUserSequence.length === gameSequence.length) {
      playSound('/sounds/correct.mp3');
      setIsUserTurn(false);
      setMessage('✅ Correct! Get ready for the next round...');
      await delay(1000);
      setRound((prev) => prev + 1);
      setMessage('');
      nextRound(gameSequence);
    }
  };

  const handlePlayAgain = () => {
    setRound(0);
    startGame();
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-4">🎯 Color Memory Game</h1>

        {!isPlaying && !isUserTurn && !gameSequence.length && (
          <button
            onClick={startGame}
            className="mb-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Game
          </button>
        )}

        {gameOver && (
          <button
            onClick={handlePlayAgain}
            className="mb-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            🔁 Play Again
          </button>
        )}

        <div className="flex space-x-6 mb-6">
          <p className="text-lg">🏁 Round: {round}</p>
          <p className="text-lg">🏆 High Score: {highScore}</p>
        </div>

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

        <p className="text-xl font-medium text-center max-w-md">{message}</p>
      </div>
    </>
  );
}
