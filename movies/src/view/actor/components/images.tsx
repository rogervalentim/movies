import { ProfilesProps } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Film, Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;

export function Images() {
    const { actorId } = useParams();

    const { data: actorPhotos, isLoading: actorPhotosIsLoading } = useQuery<ProfilesProps[]>({
      queryKey: ["actor-photos", actorId],
      queryFn: async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
              
        return data.profiles;
      },
      enabled: !!actorId,
  });
  
    if (actorPhotosIsLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={50} color="#fff" /> 
      </div>   
        ) 
    }
    return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 py-4">
        {actorPhotos?.map(photo => (
          <>
          <div className="aspect-[2/3]">
          {photo?.file_path ? (
          <img 
          className="cursor-pointer w-full h-full object-cover p-1 bg-zinc-800/60"
          src={`https://image.tmdb.org/t/p/w500${photo?.file_path}`} 
          alt={photo.file_path} />
           ) :  (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
               <Film
                className="h-full w-full object-cover text-zinc-500"                          
           />
             </div>
           )}
           </div>
           </>
        ))}
      </div>   
    )
}