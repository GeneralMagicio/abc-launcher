import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (acceptedFile: File) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedImage(file); // Create a URL for the selected image
      onDrop(file);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`py-14 border-[1px] border-dashed border-giv-500 p-4 rounded-2xl text-center bg-gray-100 text-gray-400 cursor-pointer`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the icon here ...</p>
        ) : (
          <>
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected Icon"
                className="mb-4"
              />
            ) : (
              <>
                <p>Drop your Token icon here</p>
                <p>or</p>
                <p className="font-bold">Browse Files</p>
              </>
            )}
          </>
        )}
      </div>
      {selectedImage && <p>{selectedImage.name}</p>}
    </>
  );
};
