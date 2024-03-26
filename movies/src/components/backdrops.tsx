import { X } from "lucide-react";
import { useState } from "react";

interface BackdropsComponentProps {
  file_path: string;
}

export function Backdrops({ file_path }: BackdropsComponentProps) {
  const [modalOpen, setModalOpen] = useState(false);

const openModal = () => {
 setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
};

  return (
    <>
    <img
      key={file_path}
      src={`https://image.tmdb.org/t/p/w780${file_path}`}
      className="cursor-pointer border-4 h-full object-cover border-border"
      alt="Backdrop"
      onClick={() => openModal()}
    />
    {modalOpen && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
    <div className="p-4 rounded-lg">
      <button className="absolute top-1 right-1 z-100 p-3 text-3xl bg-black/60 rounded-full hover:text-primary transition" onClick={closeModal}>
        <X className="text-2xl text-white" />
      </button>
      <div className="flex justify-center items-center">
        <img 
          key={file_path}
          src={`https://image.tmdb.org/t/p/w1280${file_path}`} 
          className="cursor-pointer h-full lg:h-[90vh] border-4 border-border"
        />
      </div>
    </div>
  </div>
)}

    </>
  );
}
