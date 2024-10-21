import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock } from 'lucide-react';


const Header = () => {
  const [isExamplesOpen, setIsExamplesOpenState] = useState(false);
  const [hoveredExample, setHoveredExample] = useState<number | null>(0); 

  const examples = [
    { image: '/slicedrop.github.com/14yrold.png', caption: 'The surface of the left hemisphere of a 2 years old healthy brain.', loadingTime: 2 },
    { image: '/slicedrop.github.com/avf_small.png', caption: 'A contrast enhanced 3D MR image showing an arteriovenous fistula.', loadingTime: 1 },
    { image: '/slicedrop.github.com/2yrold_small.png', caption: 'The surface of the left hemisphere of a 2 years old healthy brain.', loadingTime: 2 },
    { image: '/slicedrop.github.com/brainstem_small.png', caption: 'A region of the brainstem of a human adult.', loadingTime: 1 },
  ];

  const getLoadingTimeColor = (loadingTime: number) => {
    if (loadingTime <= 2) return 'bg-green-500';
    if (loadingTime <= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const ExamplesComponentInPopup = () => (
    <div className="grid grid-cols-2 gap-4">
      {examples.map((example, index) => (
        <div
          key={index}
          className={`w-full flex flex-col items-center p-4 border border-gray-700 rounded-lg bg-gray-900 transform transition-transform duration-300 cursor-pointer ${
            hoveredExample === index ? 'scale-105 border-white' : 'scale-100'
          }`}
          onMouseEnter={() => setHoveredExample(index)}
          onMouseLeave={() => setHoveredExample(null)}
        >
          <img
            src={example.image}
            alt={`Example ${index + 1}`}
            width={120}
            height={120}
            className="rounded-md mb-4"
          />
          <p className="text-sm text-center mb-2">{example.caption}</p>
          <div className={`flex items-center ${getLoadingTimeColor(example.loadingTime)} rounded-full px-2 py-1 text-xs`}>
            <Clock className="w-3 h-3 mr-1" />
            <span className="font-semibold">{example.loadingTime}/5</span>
          </div>
        </div>
      ))}
    </div>
  );


  const ExamplesComponentOnPage = () => (
    <div className="flex flex-col items-start mb-4">
      <p className="mb-2">Try the examples...</p>
      <div className="flex justify-start space-x-2 mb-2">
        {examples.map((example, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${index === hoveredExample ? 'scale-110' : 'scale-100'} transition-all duration-300`}
            onMouseEnter={() => setHoveredExample(index)}
          >
            <Button variant="ghost" className="p-0 h-auto relative">
              <img
                src={example.image}
                alt={`Example ${index + 1}`}
                width={80}
                height={80}
                className="rounded-md border border-gray-700"
              />
              {index === hoveredExample && (
                <div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 
                                border-l-4 border-r-4 border-t-4 border-t-gray-700 border-l-transparent border-r-transparent"
                />
              )}
            </Button>
          </div>
        ))}
      </div>


      <div className="text-center min-h-[3rem] flex items-center justify-center bg-gray-700 rounded-md p-2 transition-all duration-300 relative text-xs">
        <p className="pr-8">{hoveredExample !== null ? examples[hoveredExample]?.caption : null}</p>
        <div className={`absolute bottom-1 right-1 flex items-center ${getLoadingTimeColor(hoveredExample !== null ? examples[hoveredExample]?.loadingTime : 0)} rounded-full px-1 py-0.5 text-[10px]`}>
          <Clock className="w-2 h-2 mr-0.5" />
          <span className="font-semibold">{hoveredExample !== null ? examples[hoveredExample]?.loadingTime : 0}/5</span>
        </div>
      </div>
    </div>
  );

  return (
    <header className="p-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <a href="/slicedrop.github.com/" className="text-3xl font-bold text-gray-400 hover:text-white transition">
          Slice:Drop
        </a>
      </div>

          <div className="xl-custom:hidden">
            <Button onClick={() => setIsExamplesOpenState(true)} variant="secondary">
              Run Examples
            </Button>
          </div>

          <Dialog open={isExamplesOpen} onOpenChange={setIsExamplesOpenState}>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Run Examples</DialogTitle>
              </DialogHeader>
              <ExamplesComponentInPopup />
            </DialogContent>
          </Dialog>


          <div className="hidden xl-custom:block absolute top-6 right-6 w-[316px]">
            <ExamplesComponentOnPage />
          </div>
    </header>
  );
};

export default Header;
