import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (files.length > 0) {
      // Load the volume from the first file
      const loadVolume = async () => {
        const file = files[0]; // Use the first file
        await nv.loadFromFile(file);
      };

      loadVolume();
    }
  }, [files]); // Trigger when files change

  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <NiivuePanel nv={nv} volumes={files} />
    </div>
  );
};

export default NiiVue;
