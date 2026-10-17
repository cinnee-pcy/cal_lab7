import { useState } from 'react'
import './App.css'

function App() {
  // 5. State of the page
  const [input, setInput] = useState("0");

  // 6. Function to handle the click event
  const handleClick = (value) => {
    if (value === "AC") {
      setInput("0");
    } else if (value === "⌫") {
      if (input === "Error") {
        setInput("0");
        return;
      } else {
        setInput(input.length === 1 ? "0" : input.slice(0, -1));
      }
    } else if (value === "=") {
      try {
        const expr = input.replaceAll("÷", "/").replaceAll("×", "*").replaceAll("−", "-");
        setInput(eval(expr).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput(input === "0" ? value : input + value);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex items-center justify-center">
      <div className="w-80 h-[600px] bg-black rounded-[2.5rem] shadow-2xl p-8">
        <div className="w-full text-right text-white text-6xl font-medium mt-4 truncate">
          {input}
        </div>

        
        <div className="grid grid-cols-4 gap-4 mt-6">
          <button onClick={() => handleClick("⌫")} className="bg-gray-500 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">⌫</button>
          <button onClick={() => handleClick("AC")} className="bg-gray-500 text-white text-2xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">AC</button>
          <button onClick={() => handleClick("%")} className="bg-gray-500 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">%</button>
          <button onClick={() => handleClick("÷")} className="bg-orange-600 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">÷</button>
        </div>

      
        <div className="grid grid-cols-4 gap-4 mt-4">
          <button onClick={() => handleClick("7")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">7</button>
          <button onClick={() => handleClick("8")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">8</button>
          <button onClick={() => handleClick("9")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">9</button>
          <button onClick={() => handleClick("×")} className="bg-orange-600 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">×</button>
        </div>

        
        <div className="grid grid-cols-4 gap-4 mt-4">
          <button onClick={() => handleClick("4")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">4</button>
          <button onClick={() => handleClick("5")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">5</button>
          <button onClick={() => handleClick("6")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">6</button>
          <button onClick={() => handleClick("-")} className="bg-orange-600 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">-</button>
        </div>

        
        <div className="grid grid-cols-4 gap-4 mt-4">
          <button onClick={() => handleClick("1")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">1</button>
          <button onClick={() => handleClick("2")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">2</button>
          <button onClick={() => handleClick("3")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">3</button>
          <button onClick={() => handleClick("+")} className="bg-orange-600 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">+</button>
        </div>

        {/* Row 5 */}
        <div className="grid grid-cols-4 gap-4 mt-3">
          <button onClick={() => handleClick("±")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">±</button>
          <button onClick={() => handleClick("0")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">0</button>
          <button onClick={() => handleClick(".")} className="bg-slate-700 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">.</button>
          <button onClick={() => handleClick("=")} className="bg-orange-600 text-white text-3xl font-medium h-15 w-15 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">=</button>
        </div>
      </div>
    </div>
  )
}

export default App