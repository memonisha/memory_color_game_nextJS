"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <h1 className="text-xl font-bold">🧠 Color Memory</h1>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/game" className="hover:underline">Game</Link>
      </div>
    </nav>
  );
}
