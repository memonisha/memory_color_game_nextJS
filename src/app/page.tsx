

import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Memory Color Game 🎮</h2>
        <p className="text-lg">Test your memory and have fun!</p>
      </div>
    </>
  );
}
