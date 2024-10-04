import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import IImagePreviewModal from "./IImagePreviewModal";

const ImagePreviewModal = ({
  isOpen,
  images,
  onClose,
  currentIndex,
}: IImagePreviewModal) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);

  useEffect(() => {
    setCurrentImageIndex(currentIndex);
  }, [currentIndex, isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevImage();
      } else if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative">
        <img
          className="max-w-full max-h-full rounded-lg shadow-lg"
          src={images[currentImageIndex]}
          alt="Preview"
        />

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronLeftIcon className="h-6 w-6 text-black" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <ChevronRightIcon className="h-6 w-6 text-black" />
        </button>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md flex items-center justify-center"
        >
          <XMarkIcon className="h-6 w-6 text-black" />
        </button>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
