import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Button({ label, onClick, isOperator, isSpecial }) {
  const { theme } = useContext(ThemeContext);

  const getStyle = () => {
    // ปุ่มเครื่องหมายคำนวณฝั่งขวา (÷, ×, -, +, =)
    if (isOperator) {
      return 'bg-orange-500 hover:bg-orange-400 text-white';
    }
    // ปุ่มแถวบน (⌫, AC, %)
    if (isSpecial) {
      return theme === 'dark'
        ? 'bg-neutral-600 hover:bg-neutral-500 text-white'
        : 'bg-neutral-300 hover:bg-neutral-200 text-neutral-800';
    }
    // ปุ่มตัวเลขและจุดทศนิยม
    return theme === 'dark'
      ? 'bg-neutral-800 hover:bg-neutral-700 text-white'
      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 shadow-sm';
  };

  return (
    <button
      onClick={() => onClick(label)}
      className={`h-14 w-14 sm:h-15 sm:w-15 rounded-full text-2xl font-medium flex items-center justify-center transition-all duration-150 active:scale-95 cursor-pointer ${getStyle()}`}
    >
      {label}
    </button>
  );
}

export default Button;