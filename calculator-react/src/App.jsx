import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import Button from './Button';
import './App.css';

const API_BASE = 'http://127.0.0.1:8000';

function App() {
  const [input, setInput] = useState('0');
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState('dark');

  // ข้อ 3: สลับ Light / Dark mode
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // ข้อ 2: ดึงประวัติจาก Backend
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/history`);
      if (res.ok) {
        const data = await res.json();
        // รองรับทั้งแบบ array ตรงๆ หรือ object { history: [...] }
        setHistory(Array.isArray(data) ? data : data.history || []);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  // 2a. The component is mounted => useEffect
  useEffect(() => {
    fetchHistory();
  }, []);

  // ส่งคำนวณไปที่ FastAPI (Lab 06)
  const calculateResult = async (expression) => {
    try {
      const sanitized = expression
        .replaceAll('×', '*')
        .replaceAll('÷', '/')
        .replaceAll('−', '-');

      const res = await fetch(`${API_BASE}/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expr: sanitized }),
      });

      const data = await res.json();
      if (data && (data.ok || data.result !== undefined)) {
        setInput(String(data.result));
        // 2b. The = is clicked => ดึง history ใหม่มาอัปเดต
        fetchHistory();
      } else {
        setInput('Error');
      }
    } catch {
      setInput('Error');
    }
  };

  // ล้างค่าและประวัติ (ข้อ 2c)
  const handleClear = async () => {
    setInput('0');
    try {
      await fetch(`${API_BASE}/history`, { method: 'DELETE' });
    } catch (err) {
      console.error('Failed to clear backend history:', err);
    }
    // 2c. The Clear is clicked => ดึง history ใหม่
    fetchHistory();
  };

  const handleClick = (value) => {
    if (value === 'AC') {
      handleClear();
    } else if (value === '⌫') {
      setInput((prev) => (prev.length > 1 && prev !== 'Error' ? prev.slice(0, -1) : '0'));
    } else if (value === '=') {
      calculateResult(input);
    } else if (value === '±') {
      setInput((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else if (value === '%') {
      try {
        setInput((prev) => String(parseFloat(prev) / 100));
      } catch {
        setInput('Error');
      }
    } else {
      setInput((prev) => (prev === '0' || prev === 'Error' ? value : prev + value));
    }
  };

  return (
    // ข้อ 5: ThemeContext.Provider
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen w-full flex items-center justify-center p-6 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-neutral-950 text-white' : 'bg-slate-100 text-neutral-900'
        }`}
      >
        <div className="flex flex-col md:flex-row gap-8 items-center max-w-4xl">
          {/* กล่องเครื่องคิดเลข */}
          <div
            className={`w-80 rounded-[2.5rem] p-8 shadow-2xl transition-colors duration-300 ${
              theme === 'dark' ? 'bg-black border border-neutral-800' : 'bg-white border border-neutral-200'
            }`}
          >
            {/* Header: Toggle Theme (ข้อ 3) */}
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider opacity-40 font-semibold">Calculator</span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-neutral-500/20 text-xl cursor-pointer transition-transform active:scale-90"
                title="Toggle Theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>

            {/* Display */}
            <div className="w-full text-right text-6xl font-medium my-4 truncate">
              {input}
            </div>

            {/* ปุ่มกด 4x5 Grid */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <Button label="⌫" onClick={handleClick} isSpecial />
              <Button label="AC" onClick={handleClick} isSpecial />
              <Button label="%" onClick={handleClick} isSpecial />
              <Button label="÷" onClick={handleClick} isOperator />

              <Button label="7" onClick={handleClick} />
              <Button label="8" onClick={handleClick} />
              <Button label="9" onClick={handleClick} />
              <Button label="×" onClick={handleClick} isOperator />

              <Button label="4" onClick={handleClick} />
              <Button label="5" onClick={handleClick} />
              <Button label="6" onClick={handleClick} />
              <Button label="-" onClick={handleClick} isOperator />

              <Button label="1" onClick={handleClick} />
              <Button label="2" onClick={handleClick} />
              <Button label="3" onClick={handleClick} />
              <Button label="+" onClick={handleClick} isOperator />

              <Button label="±" onClick={handleClick} />
              <Button label="0" onClick={handleClick} />
              <Button label="." onClick={handleClick} />
              <Button label="=" onClick={handleClick} isOperator />
            </div>
          </div>

          {/* ส่วนแสดง History ที่ดึงจาก Backend (ข้อ 2) */}
          <div
            className={`w-80 h-[560px] rounded-[2.5rem] p-6 shadow-xl flex flex-col transition-colors duration-300 ${
              theme === 'dark' ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200'
            }`}
          >
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-500/20">
              <h2 className="text-lg font-semibold">History</h2>
              <span className="text-xs px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 font-mono">FastAPI</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {history.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm opacity-40">
                  No calculations yet
                </div>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border text-sm transition-all ${
                      theme === 'dark'
                        ? 'bg-neutral-800/60 border-neutral-700/50'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="opacity-60 text-xs">{item.expr || item.expression}</div>
                    <div className="text-lg font-semibold mt-0.5 text-orange-500">
                      = {item.result}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;