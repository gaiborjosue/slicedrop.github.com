import React from 'react';
import { Button } from "@/components/ui/button";
import { Github, Info } from 'lucide-react';

interface FooterProps {
  onInfoClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onInfoClick }) => {
  return (
    <footer className="p-4 text-center bg-black text-sm">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Button variant="link" asChild>
            <a href="https://github.com/gaiborjosue/slicedrop.github.com/tree/reload" className="flex items-center text-white text-left">
              <Github className="w-4 h-4 mr-1" />
              Source Code
            </a>
          </Button>
        </div>
        <Button variant="link" onClick={onInfoClick} className="flex items-center bg-gray-800 text-white">
          <Info className="w-4 h-4 mr-1" />
          Learn More
        </Button>
      </div>
    </footer>
  );
};

export default Footer;