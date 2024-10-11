import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, Github, HelpCircle, Info,Clock  } from 'lucide-react'
import Ripple from "@/components/ui/ripple";
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"


export default function App() {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isExamplesOpen, setIsExamplesOpen] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [hoveredExample, setHoveredExample] = useState<number>(0)

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prevFiles => [...prevFiles, ...selectedFiles])
      setIsFadingOut(true)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prevFiles => [...prevFiles, ...droppedFiles])
    setIsFadingOut(true)
  }, [])

  const getLoadingTimeColor = (loadingTime: number) => {
    if (loadingTime <= 2) return 'bg-green-500'
    if (loadingTime <= 4) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => setIsFadingOut(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [isFadingOut])

  const acceptedFormats = [
    { 
      type: "Fibers", 
      formats: [".trk", ".tko"],
      image: "/fibers.png"
    },
    { 
      type: "Volumes", 
      formats: [".mgh", ".mgz", ".nrrd", ".nii", ".nii.gz", "DICOM"],
      image: "/dicom.png"
    },
    { 
      type: "Models", 
      formats: [".obj", ".vtk", ".stl", "FreeSurfer"],
      image: "/surface.png"
    }
  ]

  const examples = [
    { image: "/14yrold.png", caption: "The surface of the left hemisphere of a 2 years old healthy brain. The scalar overlay shows the bending energy based on Curvedness. Loading time: ++", loadingTime: 3 },
    { image: "/avf_small.png", caption: "A contrast enhanced 3D MR image showing an arteriovenous fistula which is a bypass created by joining an artery and a vein, located in an arm.", loadingTime: 1 },
    { image: "/2yrold_small.png", caption: "The surface of the left hemisphere of a 2 years old healthy brain. The scalar overlay shows the bending energy based on Curvedness.", loadingTime: 2 },
    { image: "/brainstem_small.png", caption: "A region of the brainstem of a human adult including an automatically generated segmentation as a label map colorized using an anatomical color table.", loadingTime: 1 },
  ]

  // <img src="/logo.svg" alt="SlideDrop Logo" width={40} height={40} />
  
  return (
    <>
    <div className={`h-screen w-screen bg-black text-white flex flex-col transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          
          <a href="/"><h1 className="text-3xl font-bold text-gray-400 hover:text-white transition">Slice:Drop</h1></a>
        </div>

        <button onClick={() => setIsExamplesOpen(true)} className="px-6 py-2 bg-gray-800 text-gray-400 rounded-lg font-bold transform hover:-translate-y-1 transition hover:text-white duration-400">
          Run Examples
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-semibold mb-3 text-center text-gray-400">Instantly view scientific and medical imaging data in 3D.</h2>
        <p className="text-sm text-gray-500">Your data stays on your computer. No upload required!</p>
        <div
          className={`
            relative w-full max-w-2xl aspect-video rounded-lg transition-all duration-500 ease-in-out
            overflow-hidden cursor-pointer mb-6
          `}
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
              transform: isDragging || isHovering ? 'scale(1.25)' : 'scale(0.75)',
            }}
          />
          <div 
            className={`
              relative z-10 rounded-lg p-8 text-center 
              transition-all duration-500 ease-in-out h-full flex flex-col justify-center
            `}
          >
            <Upload className="mx-auto mb-4 h-12 w-12" />
            <p className="mb-2">Drag & Drop files here</p>
            <p className="text-sm text-gray-400">or click to select files</p>
            <Ripple />
          </div>
          {files.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4 rounded-b-lg">
              <h3 className="text-xl font-semibold mb-2">Uploaded Files:</h3>
              <ul className="list-disc list-inside max-h-32 overflow-y-auto">
                {files.map((file, index) => (
                  <li key={index} className="truncate">{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="w-full max-w-xl rounded-lg p-6 mb-5">
          <h3 className="text-xl font-semibold mb-4 text-center">Accepted File Formats</h3>
          <div className="grid grid-cols-3 gap-3">
            {acceptedFormats.map((format, index) => (
              <div key={index} className="flex flex-col items-center mt-5">
                <img 
                  src={format.image} 
                  alt={`${format.type} icon`} 
                  width={120} 
                  height={80}
                  className="mb-2 rounded-md"
                />
                <h4 className="font-semibold mb-1">{format.type}</h4>
                <p className="text-sm text-gray-400 text-center">
                  {format.formats.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-sm">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="link" asChild>
              <a href="https://github.com/yourusername/slidedrop" className="flex items-center text-white text-left">
                <Github className="w-4 h-4 mr-1" />
                Source Code
              </a>
            </Button>
            <Button variant="link" asChild>
              <a href="/help" className="flex items-center text-white text-left">
                <HelpCircle className="w-4 h-4 mr-1" />
                Need Help?
              </a>
            </Button>
          </div>
          <Button variant="link" onClick={() => setIsInfoOpen(true)} className="flex items-center bg-gray-800 text-white">
            <Info className="w-4 h-4 mr-1" />
            Learn More
          </Button>
        </div>
      </footer>

      <Dialog open={isExamplesOpen} onOpenChange={setIsExamplesOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Run Examples</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <div className="flex justify-between items-start space-x-4 mb-4">
              {examples.map((example, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center ${index === hoveredExample ? 'scale-105' : 'scale-100'} transition-all duration-300`}
                  onMouseEnter={() => setHoveredExample(index)}
                >
                  <Button variant="ghost" className="p-0 h-auto relative">
                    <img
                      src={example.image}
                      alt={`Example ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                    {index === hoveredExample && (
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 
                                      border-l-8 border-r-8 border-t-8 border-t-gray-700 border-l-transparent border-r-transparent" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
            <div className="w-full text-center min-h-[4rem] flex items-center justify-center bg-gray-700 rounded-md p-4 transition-all duration-300 relative">
              <p className="text-sm">
                {examples[hoveredExample].caption}
              </p>
              <div className={`absolute bottom-2 right-2 flex items-center ${getLoadingTimeColor(examples[hoveredExample].loadingTime)} rounded-full px-2 py-1 text-xs`}>
                <Clock className="w-3 h-3 mr-1" />
                <span className="font-semibold">
                  {examples[hoveredExample].loadingTime}/5
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>About Slice:Drop</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p className="mb-4">
              We think that the best way to render your files is without any necessary conversions. Just drop them on this website and they are ready to render. Slice:Drop supports a variety of scientific file formats out-of-the-box (see here for a complete list).
            </p>
            <p className="mb-4">
              Slice:Drop uses WebGL and HTML5 Canvas to render the data in 2D and 3D. We use our own open-source toolkit to perform the rendering, called XTK.
            </p>
            <p>
              All data stays on the client and nothing gets transferred via the internet. This is totally safe!
            </p>
          </DialogDescription>
        </DialogContent>
      </Dialog>

    </div>
    </>
  )
}