import { useState, useCallback, useEffect } from 'react'
import { Upload, X, Github, HelpCircle } from 'lucide-react'


export default function Component() {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isExamplesOpen, setIsExamplesOpen] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)

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
      image: "/placeholder.svg?height=40&width=40"
    },
    { 
      type: "Volumes", 
      formats: [".mgh", ".mgz", ".nrrd", ".nii", ".nii.gz", "DICOM"],
      image: "/placeholder.svg?height=40&width=40"
    },
    { 
      type: "Models", 
      formats: [".obj", ".vtk", ".stl", "FreeSurfer"],
      image: "/placeholder.svg?height=40&width=40"
    }
  ]

  const examples = [
    { image: "/placeholder.svg?height=100&width=100", caption: "Example 1" },
    { image: "/placeholder.svg?height=100&width=100", caption: "Example 2" },
    { image: "/placeholder.svg?height=100&width=100", caption: "Example 3" },
    { image: "/placeholder.svg?height=100&width=100", caption: "Example 4" },
  ]

  return (
    <div className={`h-screen w-screen bg-black text-white flex flex-col transition-opacity duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Slice:Drop</h1>
        <button
          onClick={() => setIsExamplesOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Run Examples
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">Instantly view scientific and medical imaging data in 3D.</h2>
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
        >
          <div
            className="absolute inset-0 transition-transform duration-500 ease-in-out"
            style={{
              background: `radial-gradient(circle at center, 
                rgba(59, 130, 246, 0.4) 0%, 
                rgba(59, 130, 246, 0.1) 30%, 
                rgba(17, 24, 39, 0) 70%)`,
              transform: isDragging || isHovering ? 'scale(1.5)' : 'scale(1)',
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
        <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Accepted File Formats</h3>
          <div className="grid grid-cols-3 gap-4">
          
          </div>
        </div>
      </main>

      <footer className="p-4 bg-gray-900 text-center text-sm">
        <div className="flex justify-center space-x-4 mb-2">
          <a href="https://github.com/yourusername/slidedrop" className="flex items-center hover:text-blue-400 transition-colors">
            <Github className="w-4 h-4 mr-1" />
            Source Code
          </a>
          <a href="/help" className="flex items-center hover:text-blue-400 transition-colors">
            <HelpCircle className="w-4 h-4 mr-1" />
            Need Help?
          </a>
        </div>
        <p>&copy; 2023 SlideDrop. All rights reserved.</p>
      </footer>

      {isExamplesOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Run Examples</h3>
              <button
                onClick={() => setIsExamplesOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex justify-between items-start space-x-2">
              {examples.map((example, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button className="mb-2 transition-transform hover:scale-105">
                  </button>
                  <p className="text-sm text-center">{example.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}