import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Details } from "./components/details";
import { Credits } from "./components/credits";
import { Images } from "./components/images";

export function Actor() {
  const [showMovies,setShowMovies] = useState(true);
  const [showPhotos, setShowPhotos] = useState(false);

  function toggleMovies() {
    setShowMovies(true);
    setShowPhotos(false);
  }
  
  function togglePhotos() {
    setShowPhotos(true);
    setShowMovies(false);
  }

  return (
      <section className="px-6 py-4">
       <Details />

          <div className="flex justify-center py-6 gap-3 cursor-pointer">
            <Button  variant={showMovies ? 'default' : 'outline'} onClick={toggleMovies} className={showMovies ? 'text-black font-semibold text-lg' : 'text-primary font-semibold text-lg'}>Participações</Button>
            <Button  variant={showPhotos ? 'default' : 'outline'} onClick={togglePhotos} className={showPhotos ? 'text-black font-semibold text-lg' : 'text-primary font-semibold text-lg'}>Fotos</Button>
          </div>

      {showMovies && (
       <>
        <Credits />
      </>
      )}

      {showPhotos && (
       <Images />
      )}
   </section>
  );
}
