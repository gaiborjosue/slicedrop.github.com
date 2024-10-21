import React, { useRef, useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import Ripple from "@/components/ui/ripple";

interface FileDropZoneProps {
  onFilesAdded: (files: File[]) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFilesAdded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFilesAdded(selectedFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onFilesAdded(droppedFiles);
    setIsDragging(false);
  }, [onFilesAdded]);

  return (
    <div
      className="relative w-full max-w-2xl aspect-video rounded-lg transition-all duration-500 ease-in-out overflow-hidden cursor-pointer mb-6"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        multiple
      />
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(59, 130, 246, 0.4) 0%, 
            rgba(59, 130, 246, 0.1) 30%, 
            rgba(17, 24, 39, 0) 45%)`,
          transform: isDragging || isHovering ? 'scale(1.05)' : 'scale(0.75)',
        }}
      />
      <div className="relative z-10 rounded-lg p-8 text-center transition-all duration-500 ease-in-out h-full flex flex-col justify-center">
        <Upload className="mx-auto mb-4 h-12 w-12" />
        <p className="mb-2">Drag & Drop files here</p>
        <p className="text-sm text-gray-400">or click to select files</p>
        <Ripple />
      </div>
    </div>
  );
};

export default FileDropZone;