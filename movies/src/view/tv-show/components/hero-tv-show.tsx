import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {TmdbProps } from "@/types/types";
import { Skeleton } from "../../../components/ui/skeleton";
import { Link } from "react-router-dom";
import { Card } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { ScrollArea } from "../../../components/ui/scroll-area";

const apiKey = "fb8991fa7ac1a75e1cd0dd9805822f4c";

import film from "../../../assets/film.svg";
import horror from "../../../assets/horror.png";
import { useMediaQuery } from "react-responsive";

export function HeroTvShow() {
  const isMobile = useMediaQuery({maxWidth: 1024})

  const { data: tvShow, isLoading } = useQuery<TmdbProps>({
    queryKey: ["get-trending-tv-show"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      return data.results[0];
    }
  });

  const { data: tvShowDetails, isLoading: isDetailsLoading } = useQuery<TmdbProps>({
    queryKey: ["get-movie-details", tvShow?.id],
    queryFn: async () => {
      if (tvShow) {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${tvShow.id}?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
        return data;
      }
    },
    enabled: !!tvShow
  });

  if (isLoading || isDetailsLoading) {
    return (
     <Skeleton className="w-full object-cover h-[400px] lg:h-[480px]" />
    );
  }

  return (
    <section>
    <Link to={`/tv/${tvShowDetails?.id}`}>
    {isMobile ? (
    <div className="w-full">
        <img 
          src={tvShowDetails?.backdrop_path === null ? horror : `https://image.tmdb.org/t/p/w1280${tvShowDetails?.backdrop_path}`} 
          className="w-full object-cover h-[250px] md:h-[400px]"
          alt={tvShowDetails?.name} 
        />
      <div>
        <div className=" flex items-end">
          <div className="w-full bg-[#121212]">
            <div className="flex items-center gap-4">
              <img 
                src={tvShowDetails?.poster_path === null ? film : `https://image.tmdb.org/t/p/w342${tvShowDetails?.poster_path}`} 
                alt={tvShowDetails?.name}
                className="h-[120px]"
              />
              <div>
                <p className="text-lg text-white text-on-white">{tvShowDetails?.name}</p>
                <div className="flex flex-wrap gap-1 text-sm md:text-base text-muted-foreground">
                  {tvShowDetails?.genres.map(genre => (
                    <p className="flex items-center" key={genre.id}>{genre.name}</p>
                  )) }
                </div>
                <div className="flex items-center gap-2">
       </div>  
              {tvShowDetails && (

               <p className="text-sm text-muted-foreground">{tvShowDetails?.number_of_seasons} - Temporadas</p>
              )}
                <p className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">

                  <Star className="text-amber-300 fill-amber-300 size-5" />
                  <span>{tvShowDetails?.vote_average.toFixed(2)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
 <div className="w-full max-h-[480px]"> 
    <div className="flex"> 
    <div>       
    <img 
      src={tvShowDetails?.backdrop_path === null  ? horror : `https://image.tmdb.org/t/p/w1280${tvShowDetails?.backdrop_path}`} 
      className={tvShowDetails?.backdrop_path === null ? "max-h-[480px] w-[1280px]" : ""}
      alt={tvShowDetails?.name} 
    />
  </div>
    <Card className="w-1/2 px-2 border-none rounded-none bg-[#121212]">
      <div className="flex gap-3">
    <img 
      src={tvShowDetails?.poster_path === null ? film : `https://image.tmdb.org/t/p/w342${tvShowDetails?.poster_path}`} 
      alt={tvShowDetails?.name}
      className="h-[150px]"
    />
    <div>
    <p className="text-xl text-primary">{tvShowDetails?.name}</p>
    <div className="flex flex-wrap gap-1 text-sm md:text-base text-gray-300">{tvShowDetails?.genres.map(genre => (
      <p key={genre.id} className="text-sm text-muted-foreground">{genre.name}</p>
    ))}
    </div>
    
    {tvShowDetails && (
    <p className="text-sm text-muted-foreground">{tvShowDetails?.number_of_seasons} - Temporadas</p>
    )}
    <p className="text-muted-foreground flex items-center gap-2"><Star className="text-amber-300 fill-amber-300 size-5" />{tvShowDetails?.vote_average.toFixed(2)}</p>
    </div>
        </div> 
        <Separator className="mt-2" />
        <ScrollArea className="max-h-[250px] overflow-y-auto px-2 py-2">
         <h2 className="text-xl text-primary">Sinopse</h2>
          <p className="text-muted-foreground text-base py-2">{tvShowDetails?.overview === "" ? "Essa série não tem sinopse" || "Esse filme não tem sinopse" : tvShowDetails?.overview}</p>
        </ScrollArea>
  </Card>
  
</div>
</div>
  )}
  </Link>
      </section>
  )
}
