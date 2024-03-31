import { X } from "lucide-react";
import { useState } from "react";

interface PostersComponentProps {
    file_path: string;
}

export function Posters({file_path}: PostersComponentProps) {
    const [modalOpen, setModalOpen] = useState(false);
  
    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  

return (
    <>
    <div className="aspect-[2/3]">   
      <img 
     key={file_path}
    src={`https://image.tmdb.org/t/p/w500${file_path}`} 
    className="cursor-pointer w-full h-full p-1 bg-zinc-800/60"
    onClick={() => openModal()}
/>
</div>
      
{modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="p-4 rounded-lg">
            <button className="absolute top-1 right-1 z-100 p-3 text-3xl bg-black/60 rounded-full hover:text-primary transition" onClick={closeModal}>
              <X className="text-2xl text-white" />
            </button>
            <div className="flex justify-center items-center">
    <div className="aspect-[2/3]">   
            <img 
     key={file_path}
    src={`https://image.tmdb.org/t/p/w342${file_path}`} 
    className="w-full object-cover p-1 bg-zinc-800/60"
    />
    </div>
            </div>
          </div>
        </div>
      )}
    </>
)
}