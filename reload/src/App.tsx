import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Header from './components/Header';
import { Button } from "@/components/ui/button";
import NiiVue from './Niivue';
import FileDropZone from './components/FileDropZone';
import AcceptedFormats from './components/AcceptedFormats';
import Footer from './components/Footer';
import { HelpCircle } from 'lucide-react';

export default function App() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAdded = (selectedFiles: File[]) => {
    setFiles(selectedFiles); // Set the files to pass to Niivue
  };

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => setIsFadingOut(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isFadingOut]);

  return (
    <div className={`h-screen w-screen bg-black text-white flex flex-col transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {!files.length ? (
        <>
          <Header />
          <main className="flex-1 flex flex-col items-center bg-black justify-center p-6">
            <h2 className="text-2xl font-semibold mb-3 text-center text-gray-400">Instantly view scientific and medical imaging data in 3D.</h2>
            <p className="text-sm text-gray-500">Your data stays on your computer. No upload required!</p>
            <FileDropZone onFilesAdded={handleFilesAdded} />
            <AcceptedFormats />
          </main>
          <Footer onInfoClick={() => setIsInfoOpen(true)} />
        </>
      ) : (
        <NiiVue files={files} />
      )}

      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>About Slice:Drop</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="mb-4">We think that the best way to render your files is without any necessary conversions. Just drop them on this website and they are ready to render.</p>
            <p className="mb-4">Slice:Drop uses WebGL and HTML5 Canvas to render the data in 2D and 3D.</p>
            <p>All data stays on the client and nothing gets transferred via the internet. This is totally safe!</p>
          </DialogDescription>
          <Button variant="link" asChild>
            <a href="https://github.com/gaiborjosue/slicedrop.github.com/issues" className="flex items-center text-white text-left">
              <HelpCircle className="w-4 h-4 mr-1" />
              Need Help?
            </a>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
