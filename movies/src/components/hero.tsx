import { useMediaQuery } from "react-responsive";

import horror from "../assets/horror.png";
import film from  "../assets/film.svg";
import { MovieDetailsProps, TvShowDetailsProps } from "@/types/types";
import { Star } from "lucide-react";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

interface HeroProps {
    tvShowDetails?: TvShowDetailsProps;
    movieDetails?: MovieDetailsProps;
}

export function Hero({tvShowDetails, movieDetails}: HeroProps) {
  const isMobile = useMediaQuery({maxWidth: 1024})

  function formatRuntime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
}

const messageOverviewNotFound = movieDetails?.id ? "Esse filme não tem sinopse" : "Essa série não tem sinopse"

    return (
        <section>
      {isMobile ? (
      <div className="w-full">
          <img 
            src={tvShowDetails?.backdrop_path === null || movieDetails?.backdrop_path === null ? horror : `https://image.tmdb.org/t/p/w1280${tvShowDetails?.backdrop_path || movieDetails?.backdrop_path}`} 
            className="w-full object-cover h-[250px] md:h-[400px]"
            alt={tvShowDetails?.name || movieDetails?.title} 
          />
        <div>
          <div className=" flex items-end">
            <div className="w-full bg-[#121212]">
              <div className="flex items-center gap-4">
                <img 
                  src={tvShowDetails?.poster_path === null || movieDetails?.poster_path === null ? film : `https://image.tmdb.org/t/p/w342${tvShowDetails?.poster_path || movieDetails?.poster_path}`} 
                  alt={tvShowDetails?.name || movieDetails?.title}
                  className="h-[120px]"
                />
                <div>
                  <p className="text-lg text-white text-on-white">{tvShowDetails?.name || movieDetails?.title}</p>
                  <div className="flex flex-wrap gap-1 text-sm md:text-base text-muted-foreground">
                    {tvShowDetails?.genres.map(genre => (
                      <p className="flex items-center" key={genre.id}>{genre.name}</p>
                    )) || 
                    movieDetails?.genres.map(genre => (
                      <p className="flex items-center" key={genre.id}>{genre.name}</p>
                    ))
                    }
                  </div>
                  <div className="flex items-center gap-2">
                  {movieDetails && (
            <>
                              <p className="text-muted-foreground">
                              {movieDetails && movieDetails.release_date ? format(new Date(movieDetails.release_date),'yyyy') : ''}
                            </p>                    
                            <p className="text-muted-foreground">{movieDetails ? formatRuntime(movieDetails.runtime) : 'N/A'}</p>
                            </>
        )}                  </div>  
                {tvShowDetails && (

                 <p className="text-sm text-muted-foreground">{tvShowDetails?.number_of_seasons} - Temporadas</p>
                )}
                  <p className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">

                    <Star className="text-amber-300 fill-amber-300 size-5" />
                    <span>{tvShowDetails?.vote_average.toFixed(2) || movieDetails?.vote_average.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
   <div className="w-full"> 
      <div className="flex"> 
      <div>       
      <img 
        src={tvShowDetails?.backdrop_path === null || movieDetails?.backdrop_path === null  ? horror : `https://image.tmdb.org/t/p/w1280${tvShowDetails?.backdrop_path || movieDetails?.backdrop_path}`} 
        className={tvShowDetails?.backdrop_path === null || movieDetails?.backdrop_path === null  ? "w-full h-full object-cover" : "w-full h-full object-cover"}
        alt={tvShowDetails?.name || movieDetails?.title} 
      />
    </div>
      <Card className="w-1/2 px-2 border-none rounded-none bg-[#121212]">
        <div className="flex gap-3">
      <img 
        src={tvShowDetails?.poster_path === null || movieDetails?.poster_path === null  ? film : `https://image.tmdb.org/t/p/w342${tvShowDetails?.poster_path || movieDetails?.poster_path}`} 
        alt={tvShowDetails?.name || movieDetails?.title}
        className="h-[150px]"
      />
      <div>
      <p className="text-xl text-primary">{tvShowDetails?.name || movieDetails?.title}</p>
      <div className="flex flex-wrap gap-1 text-sm md:text-base text-gray-300">{tvShowDetails?.genres.map(genre => (
        <p key={genre.id} className="text-sm text-muted-foreground">{genre.name}</p>
      )) ||
      movieDetails?.genres.map(genre => (
        <p key={genre.id} className="text-sm text-muted-foreground">{genre.name}</p>
      )) 
      }
      </div>
      <div className="flex items-center gap-2">
        {movieDetails && (
            <>
                              <p className="text-muted-foreground">
                              {movieDetails && movieDetails.release_date ? format(new Date(movieDetails.release_date),'yyyy') : ''}
                            </p>                    
                            <p className="text-muted-foreground">{movieDetails ? formatRuntime(movieDetails.runtime) : 'N/A'}</p>
                            </>
        )}
                  </div>  
      {tvShowDetails && (
      <p className="text-sm text-muted-foreground">{tvShowDetails?.number_of_seasons} - Temporadas</p>
      )}
      <p className="text-muted-foreground flex items-center gap-2"><Star className="text-amber-300 fill-amber-300 size-5" />{tvShowDetails?.vote_average.toFixed(2) || movieDetails?.vote_average.toFixed(2)}</p>
      </div>
          </div> 
          <Separator className="mt-2" />
          <ScrollArea className="max-h-[250px] overflow-y-auto px-2 py-2">
           <h2 className="text-xl text-primary">Sinopse</h2>
            <p className="text-muted-foreground text-base py-2">{tvShowDetails?.overview === "" || movieDetails?.overview === "" ? messageOverviewNotFound : tvShowDetails?.overview || movieDetails?.overview }</p>
          </ScrollArea>
    </Card>
    
  </div>
</div>
    )}

        </section>
    )
}