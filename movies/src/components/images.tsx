import { Backdrops } from "@/components/backdrops";
import { Posters } from "@/components/posters";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { ImagesProps } from "@/types/types";

const apiKey = import.meta.env.VITE_API_KEY;

export function Images() {
    const { movieId, tvShowId } = useParams()
    const { data: images, isLoading: movieImagesIsLoading } = useQuery<ImagesProps>({
        queryKey: ["get-images", movieId || tvShowId],
        queryFn: async () => {
          const contentType = movieId ? "movie" : "tv"
          const id = movieId || tvShowId
          const response = await fetch(
            ` https://api.themoviedb.org/3/${contentType}/${id}/images?api_key=${apiKey}`
          );
          const data = await response.json();
    
          return data
        },
        enabled: !!movieId || !!tvShowId, 
    });

    if(movieImagesIsLoading) {
        return (
        <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={50} color="#fff" /> 
      </div>   
        ) 
    }

    return (
        <div className="px-5">
            <section className="py-6 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start flex-col lg:flex-row gap-2">
                    <p className="text-primary text-3xl">Imagens de fundo</p>
                    <span className="text-muted-foreground">({images?.backdrops.length} Imagens)</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    {images?.backdrops.map(image => (
                        <Backdrops key={image.file_path} file_path={image.file_path} />
                    ))}
                </div>
            </section>
        
            <section className="py-6 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start flex-col lg:flex-row gap-2">
                    <p className="text-primary text-3xl">Cartazes</p>
                    <span className="text-muted-foreground">({images?.posters.length} Imagens)</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
                    {images?.posters.map(image => (
                        <Posters key={image.file_path} file_path={image.file_path} />
                    ))}
                </div>
            </section>
        </div>
    );
}
