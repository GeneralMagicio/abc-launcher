import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { IconX } from "../Icons/IconX";

interface DropzoneProps {
  onDrop: (acceptedFile: File, ipfsHash: string) => void;
  name: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ name, onDrop }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadToIPFS = async (file: File) => {
    const controller = new AbortController();
    setAbortController(controller);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/ipfs", formData, {
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent?.total) return;
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      setIsLoading(false);
      return response.data.ipfsHash;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Upload canceled");
      } else {
        console.error("Error uploading to IPFS", error);
      }
      setIsLoading(false);
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
        setIpfsHash(ipfsHash);
      }
      setAbortController(null);
    },
    [onDrop]
  );

  const cancelUpload = () => {
    if (abortController) {
      abortController.abort();
      setUploadProgress(0);
      setSelectedImage(null);
      setIsLoading(false);
    }
  };

  const deleteUploadedImage = async () => {
    if (ipfsHash) {
      try {
        await axios.delete("/api/ipfs", { data: { ipfsHash } });
        setUploadProgress(0);
        setSelectedImage(null);
        // setIsLoading(false);
      } catch (error) {
        console.error("Error deleting from IPFS", error);
      }
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
        className={`py-14 border-[1px] border-dashed border-giv-500 p-4 rounded-2xl text-center bg-gray-100 text-gray-400 cursor-pointer ${
          isLoading ? "cursor-not-allowed opacity-50" : ""
        }`}
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
            {isLoading && <p className="text-blue-500 mt-2">Uploading...</p>}
          </>
        )}
      </div>
      {selectedImage && (
        <div>
          <div className="flex justify-between overflow-hidden">
            <p>{selectedImage.name}</p>
            <button
              type="button"
              onClick={ipfsHash ? deleteUploadedImage : cancelUpload}
              className="px-2 text-xs text-pink-500 rounded border-none flex gap-1 items-center"
            >
              <IconX size={8} />
              {ipfsHash ? <span>Delete</span> : <span>Cancel Upload</span>}
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
