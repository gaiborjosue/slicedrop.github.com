import React from 'react';
import { Niivue } from '@niivue/niivue';
import { NiivuePanel } from './components/NiivuePanel.tsx';

// Define the type for the files prop
interface NiiVueProps {
  files: File[]; // Expect an array of File objects
}

// Create the Niivue instance
const nv = new Niivue({
  loadingText: 'loading...',
  show3Dcrosshair: true,
  backColor: [0, 0, 0, 1], // Black background
});

const NiiVue: React.FC<NiiVueProps> = ({ files }) => {
  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      <div className="flex-1 flex justify-center items-center">
        <NiivuePanel nv={nv} volumes={files} />
      </div>
    </div>
  );
};
export default NiiVue;
