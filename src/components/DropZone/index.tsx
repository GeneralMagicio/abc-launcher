import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconX } from "../Icons/IconX";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { uploadToIPFS } from "./service"; // Import the service
import axios from "axios";

interface DropzoneProps {
  onDrop: (acceptedFile: File, ipfsHash: string) => void;
  name: string;
  rules?: RegisterOptions;
}

export const Dropzone: React.FC<DropzoneProps> = ({ name, rules, onDrop }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, setError, clearErrors, trigger } = useFormContext();

  const onDropCallback = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setSelectedImage(file);
      setIpfsHash(null);

      const controller = new AbortController();
      setAbortController(controller);
      setIsLoading(true);
      setError(name, { type: "manual", message: "Uploading..." });

      const ipfsHash = await uploadToIPFS(
        file,
        (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        },
        controller.signal
      );

      setIsLoading(false);
      setAbortController(null);

      if (ipfsHash) {
        onDrop(file, ipfsHash);
        setIpfsHash(ipfsHash);
        clearErrors(name);
        await trigger(name); // Revalidate after setting the value
      } else {
        setError(name, { type: "manual", message: "Upload failed" });
      }
    },
    [onDrop, trigger, name, setError, clearErrors]
  );

  const cancelUpload = () => {
    if (abortController) {
      abortController.abort();
      setUploadProgress(0);
      setSelectedImage(null);
      setIsLoading(false);
      clearErrors(name);
      trigger(name); // Revalidate after clearing the error
    }
  };

  const deleteUploadedImage = async () => {
    if (ipfsHash) {
      try {
        await axios.delete("/api/ipfs", { data: { ipfsHash } });
        setUploadProgress(0);
        setSelectedImage(null);
        setIpfsHash(null);
        setIsLoading(false);
        clearErrors(name);
        trigger(name); // Revalidate after clearing the error
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
        <input
          {...register(name, rules)}
          value={ipfsHash || ""}
          className="hidden"
          readOnly
        />
        {isDragActive ? (
          <p>Drop the icon here ...</p>
        ) : (
          <>
            {selectedImage ? (
              <>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Icon"
                  className="block mb-4 mx-auto"
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
          <div className="flex justify-between overflow-hidden max-w-full">
            <p className="text-sm text-nowrap max-w-full overflow-hidden text-ellipsis">
              {selectedImage.name}
            </p>
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
