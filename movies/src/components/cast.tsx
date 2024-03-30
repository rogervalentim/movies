import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import actorImg from "@/assets/user.svg"
import { ActorDetails } from "@/types/types";

const apiKey = import.meta.env.VITE_API_KEY;

export function Cast() {
  const { movieId, tvShowId } = useParams()

    const { data: cast, isLoading: castIsLoading } = useQuery<ActorDetails[]>({
        queryKey: ["get-cast", movieId || tvShowId],
        queryFn: async () => {
        const contentType = movieId ? "movie" : "tv";
        const contentId = movieId || tvShowId;

          const response = await fetch(`https://api.themoviedb.org/3/${contentType}/${contentId}/credits?api_key=${apiKey}&language=pt-BR`);
          const data = await response.json();

          return data.cast;
        },
        enabled: !!movieId || !!tvShowId,
      });
    
    if (castIsLoading) {
        return
    }

    if (!cast || cast.length === 0) {
        return;
    }

    return (
        <div className="px-5">
        <div className="flex justify-between items-center px-2 py-4">
            <h3 className="text-primary text-lg lg:text-xl">Elenco</h3>  
        </div>  
             <Carousel>
                 <CarouselContent className="-ml-2 py-2 md:-ml-4">
                     {cast.map(actor => (
                         <Link to={`/actor/${actor.id}`} key={actor?.id}>
                         <CarouselItem  className="relative w-40 basis-1/3 md:basis-1/4 md:w-52 lg:w-64">
          
                             <img
          className="cursor-pointer w-full h-full object-cover p-1 bg-zinc-800/60"
          src={actor?.profile_path === null ? actorImg : `https://image.tmdb.org/t/p/w500${actor?.profile_path}`} alt={actor?.character} />
                
                                <p className="text-white text-base w-36 lg:text-lg lg:w-40 mt-2">
                                   {actor?.name}
                                </p>                               
                             <p className="text-muted-foreground text-sm lg:text-base">{actor?.character}</p>    
 
                         </CarouselItem>
                         </Link>
                     ))}
                 </CarouselContent>
             </Carousel>
 
         </div>
    )
}
