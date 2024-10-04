interface IImagePreviewModal {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
  currentIndex: number;
}

export default IImagePreviewModal;
