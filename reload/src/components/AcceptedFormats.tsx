import React from 'react';

const acceptedFormats = [
  {
    type: "Fibers",
    formats: [".trk", ".tko"],
    image: "/slicedrop.github.com/fibers.png"
  },
  {
    type: "Volumes",
    formats: [".mgh", ".mgz", ".nrrd", ".nii", ".nii.gz", "DICOM"],
    image: "/slicedrop.github.com/dicom.png"
  },
  {
    type: "Models",
    formats: [".obj", ".vtk", ".stl", "FreeSurfer"],
    image: "/slicedrop.github.com/surface.png"
  }
];

const AcceptedFormats: React.FC = () => {
  return (
    <div className="w-full max-w-xl rounded-lg p-6 mb-5">
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
  );
};

export default AcceptedFormats;