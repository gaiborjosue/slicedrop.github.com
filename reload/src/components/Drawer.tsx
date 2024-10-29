import React, { useState } from 'react';
import {ComboboxPopover} from './ComboboxPopover';

interface DrawerProps {
  label: string;
  position: number;
  children?: React.ReactNode;
  onSliceTypeChange?: (newSliceType: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({ label, position, children, onSliceTypeChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`fixed left-0 w-${isHovered ? '48' : '2'} bg-black text-white flex items-center transition-all duration-300 border border-gray-600 cursor-pointer`}
      style={{
        top: `${10 + position * 180}px`,
        height: '150px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Label positioned outside the drawer */}
      <div
        className="absolute left-full ml-1 text-white font-bold text-[10px]"
        style={{
          writingMode: 'vertical-rl',
        }}
      >
        {label}
      </div>

      {/* Content inside the drawer, only displayed when hovered */}
      <div className={`p-4 ${isHovered ? 'flex' : 'hidden'} flex-col space-y-2`}>
        {label === "VOLUME" && onSliceTypeChange && (
          <ComboboxPopover onSliceTypeChange={onSliceTypeChange} />
        )}
        {children}
      </div>
    </div>
  );
};

export default Drawer;
