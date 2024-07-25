import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (acceptedFiles: File[]) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const onDropCallback = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
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
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 rounded-md text-center ${
        isDragActive ? "border-blue-500" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop an image here, or click to select one</p>
      )}
    </div>
  );
};
