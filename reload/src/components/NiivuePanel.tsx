import React, { useEffect, useRef } from 'react';
import { Box } from "@mui/material";
import { Niivue } from '@niivue/niivue';

// Define the prop types for NiivuePanel
interface NiivuePanelProps {
  nv: Niivue;
  volumes: File[]; // Expect an array of File objects
}

export const NiivuePanel: React.FC<NiivuePanelProps> = ({ nv, volumes }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Strongly type the ref as HTMLCanvasElement | null
  let height = 480;

  useEffect(() => {
    async function loadVolumesAndAttach() {
      const canvas = canvasRef.current;
      if (canvas) {
        // Attach the canvas to Niivue
        const rect = (canvas.parentNode as HTMLElement | null)?.getBoundingClientRect();
        if (rect) {
          canvas.width = rect.width;
          canvas.height = rect.height;
          height = canvas.height;
          nv.attachToCanvas(canvas);

          // Load volumes from the files
          for (const vol of volumes) {
            await nv.loadFromFile(vol);
          }
        }

        // Set up the resize event listener
        const handleResize = () => {
          const newRect = (canvas.parentNode as HTMLElement | null)?.getBoundingClientRect();
          if (newRect) {
            canvas.width = newRect.width;
            canvas.height = newRect.height;
            height = canvas.height;
            nv.drawScene(); // Redraw the scene on resize
          }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }

    loadVolumesAndAttach();
  }, [nv, volumes]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start',
      }}
    >
      <canvas ref={canvasRef} height={height} width={640} />
    </Box>
  );
};
