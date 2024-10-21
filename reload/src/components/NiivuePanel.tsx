import React, { useEffect, useRef } from 'react';
import { Niivue } from '@niivue/niivue';

interface NiivuePanelProps {
  nv: Niivue;
  volumes: File[];
}

export const NiivuePanel: React.FC<NiivuePanelProps> = ({ nv, volumes }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let height = 480;

  useEffect(() => {
    async function loadVolumesAndAttach() {
      const canvas = canvasRef.current;
      if (canvas) {
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

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }

    loadVolumesAndAttach();
  }, [nv, volumes]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignSelf: 'flex-start',
      }}
    >
      <canvas ref={canvasRef} height={height} width={640} />
    </div>
  );
};
