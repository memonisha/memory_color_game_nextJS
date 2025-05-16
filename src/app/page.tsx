

import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">💡Welcome to the Color Memory Game 🎮</h2>
<p className="text-lg text-gray-800"> Focus, breathe, and don’t blink...Each level gets trickier... 🐣!</p>
        <br></br>
        <p className="text-gray-800"> 🧠 Stay sharp, Simon’s watching👀  </p>

      </div>
    </>
  );
}
