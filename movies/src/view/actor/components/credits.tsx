import { TmdbProps } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Film, Loader, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;


export function Credits() {
    const { actorId } = useParams()
    const { data: actorCredits, isLoading: creditsIsLoading } = useQuery<TmdbProps[]>({
        queryKey: ["actor-credits", actorId],
        queryFn: async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${apiKey}&language=pt-BR`
            );
            const data = await response.json();
            
            return data.cast;
        },
        enabled: !!actorId,
    });

    if (creditsIsLoading) {
        return (
          <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin" size={50} color="#fff" /> 
        </div>   
          ) 
      }


    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 py-4">
        {actorCredits?.map((item: TmdbProps) => (
        <Link to={item.media_type === "movie" ? `/movie/${item?.id}`: `/tv/${item?.id}`} key={item.id}>
          <>
          <div className="aspect-[2/3]">
    {item?.poster_path ? (
    <img 
    className="cursor-pointer w-full h-full object-cover p-1 bg-zinc-800/60"
    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} 
    alt={item.name} />
     ) :  (
      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
         <Film
          className="h-full w-full object-cover text-zinc-500"                          
     />
       </div>
     )}
     </div>    
   </>

                <p className="text-white text-base w-44 lg:text-lg lg:w-56 mt-2">
            {item?.title || item?.name}
          </p>
      <div className="flex items-center gap-2 mt-3">
       <span><Star className="fill-amber-300 text-amber-300 size-5" /></span>
       <p className="text-muted-foreground text-base">{item?.vote_average.toFixed(2)}</p>
      </div>
        </Link>
        ))}
    </div>   
    )
}