import { useState } from "react";
import IPhotos from "../../interfaces/IPhotos";
import ImagePreviewModal from "../image-preview/ImagePreviewModal";

const PhotoComponent = ({ backdrops }: { backdrops: IPhotos["backdrops"] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="photo-gallery grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6 mt-4">
      {backdrops.slice(0, 6).map((backdrop, index) => (
        <img
          key={backdrop.file_path}
          src={`https://image.tmdb.org/t/p/w500${backdrop.file_path}`}
          alt="Movie Backdrop"
          className="backdrop-image rounded-lg shadow-lg w-full h-auto mb-4 cursor-pointer"
          onClick={() => handleImageClick(index)}
        />
      ))}

      <ImagePreviewModal
        isOpen={isModalOpen}
        images={backdrops.map(
          (backdrop) => `https://image.tmdb.org/t/p/w500${backdrop.file_path}`
        )}
        onClose={closeModal}
        currentIndex={selectedImageIndex}
      />
    </div>
  );
};

export default PhotoComponent;
