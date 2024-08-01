import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

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
          <p>{selectedImage.name}</p>
          <progress
            value={uploadProgress}
            max="100"
            className="w-full mb-4"
          ></progress>
          <button
            onClick={cancelUpload}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel Upload
          </button>
        </div>
      )}
    </>
  );
};
