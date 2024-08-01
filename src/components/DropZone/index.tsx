import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { IconX } from "../Icons/IconX";

interface DropzoneProps {
  onDrop: (acceptedFile: File, ipfsHash: string) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onDrop }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const uploadToIPFS = async (file: File) => {
    const controller = new AbortController();
    setAbortController(controller);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        signal: controller.signal, // Attach the abort controller signal
        onUploadProgress: (progressEvent) => {
          if (!progressEvent?.total) return;
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      return response.data.ipfsHash;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Upload canceled");
      } else {
        console.error("Error uploading to IPFS", error);
      }
      return null;
    }
  };

  const onDropCallback = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      const ipfsHash = await uploadToIPFS(file);
      if (ipfsHash) {
        onDrop(file, ipfsHash);
      }
      setAbortController(null); // Reset abort controller after upload is complete
    },
    [onDrop]
  );

  const cancelUpload = () => {
    if (abortController) {
      abortController.abort();
      setUploadProgress(0);
      setSelectedImage(null);
    }
  };

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
              <>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Icon"
                  className="mb-4"
                />
              </>
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
      {selectedImage && (
        <div>
          <div className="flex justify-between overflow-hidden">
            <p>{selectedImage.name}</p>
            <button
              onClick={cancelUpload}
              className="px-2 text-xs text-pink-500 rounded border-none flex gap-1 items-center"
            >
              <IconX size={8} />
              <span>Cancel Upload</span>
            </button>
          </div>
          <div className="relative w-full bg-gray-200 h-2 rounded-lg overflow-hidden mb-4">
            <div
              className="absolute top-0 left-0 h-full bg-giv-500 transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
