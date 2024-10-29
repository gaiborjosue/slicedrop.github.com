import React, { useEffect, useRef } from 'react';
import { Niivue } from '@niivue/niivue';
import Drawer from './components/Drawer';

interface NiivueProps {
  files: File[];
}

const nv = new Niivue({
  loadingText: 'loading...',
  show3Dcrosshair: true,
  backColor: [0, 0, 0, 1],
});

declare global {
  interface Window {
    nv: Niivue;
  }
}

const NiiVue: React.FC<NiivueProps> = ({ files }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const loadVolumesAndAttach = async () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        nv.attachToCanvas(canvas);

        for (const file of files) {
          await nv.loadFromFile(file);
        }

        nv.setSliceType(nv.sliceTypeMultiplanar);
      }

      const handleResize = () => {
        const newRect = canvas?.getBoundingClientRect();
        if (canvas && newRect) {
          canvas.width = newRect.width;
          canvas.height = newRect.height;
          nv.drawScene();
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    };

    loadVolumesAndAttach();
  }, [files]);

  const nvUpdateSliceType = (newSliceType: string) => {
    if (newSliceType === 'axial') {
      nv.setSliceType(nv.sliceTypeAxial);
    } else if (newSliceType === 'coronal') {
      nv.setSliceType(nv.sliceTypeCoronal);
    } else if (newSliceType === 'sagittal') {
      nv.setSliceType(nv.sliceTypeSagittal);
    } else if (newSliceType === 'multi') {
      nv.setSliceType(nv.sliceTypeMultiplanar);
    } else if (newSliceType === '3d') {
      nv.setSliceType(nv.sliceTypeRender);
    }
  };

  return (
    <div className="h-screen w-screen bg-black relative">
      <Drawer label="VOLUME" position={0} onSliceTypeChange={nvUpdateSliceType} />
      <Drawer label="MESH" position={1} />
      <Drawer label="FIBERS" position={2} />

      <div className="flex justify-center items-center w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default NiiVue;
