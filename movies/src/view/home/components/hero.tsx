import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";


const apiKey = import.meta.env.VITE_API_KEY;

import horror from "@/assets/horror.png"
import { format } from "date-fns";
import { useMediaQuery } from "react-responsive";
import { TmdbProps } from "@/types/types";

export function Hero() {
  const isMobile = useMediaQuery({ maxWidth: 1024 });

  const { data: movie, isLoading } = useQuery<TmdbProps>({
    queryKey: ["get-feauture-movie"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();


      return data.results[0];
    }
  });

  const { data: movieDetails, isLoading: isDetailsLoading } = useQuery<TmdbProps>({
    queryKey: ["get-movie-details", movie?.id],
    queryFn: async () => {
      if (movie) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
        return data;
      }
    },
    enabled: !!movie
  });

  if (isLoading || isDetailsLoading) {
    return (
      <Skeleton className="w-full object-cover h-[400px] lg:h-[480px]" />
    );
  }

  function formatRuntime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
}

  return (
    <>
     {isMobile ? (
      <Link to={`/movie/${movie?.id}`}>
      <div className="w-full">
          <img 
            src={movieDetails?.backdrop_path === null ? horror : `https://image.tmdb.org/t/p/w1280${movieDetails?.backdrop_path}`} 
            className="w-full object-cover  h-[250px] md:h-[400px]"
            alt={movieDetails?.title} 
          />
          <div className="flex items-end">
            <div className="w-full bg-[#121212]">
              <div className="flex items-center gap-3">
                <img 
                  src={`https://image.tmdb.org/t/p/w342${movieDetails?.poster_path}`} 
                  alt={movieDetails?.title}
                  className="h-[120px]"
                />
                <div>
                  <p className="text-lg text-white text-on-white">{movieDetails?.title}</p>
                  <div className="flex flex-wrap gap-1 text-sm md:text-base text-muted-foreground">
                    {movieDetails?.genres.map(genre => (
                      <p className="flex items-center" key={genre.id}>{genre.name}</p>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                  <p>
                    {movieDetails && movieDetails.release_date ? format(new Date(movieDetails.release_date),'yyyy') : ''}
                  </p>  
                    <span>-</span>
                    <p>{movieDetails ? formatRuntime(movieDetails.runtime) : 'N/A'}</p>
                  </div>
                  <p className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
                    <Star className="text-amber-300 fill-amber-300 size-5" />
                    <span>{movieDetails?.vote_average.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    ) : (
      <Link to={`/movie/${movie?.id}`}>
        <div className="w-full max-h-[480px]">
          <div className="flex">
            <div>
              <img
                src={movie?.backdrop_path === null ? horror : `https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
                className={movie?.backdrop_path === null ? "max-h-[480px] w-[1280px]" : ""}
                alt={movie?.title}
              />
            </div>
            <Card className="w-1/2 px-2 border-none rounded-none bg-[#121212]">
              <div className="flex gap-3">
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie?.poster_path}`}
                  alt={movie?.title}
                  className="h-[150px]"
                />
                <div>
                  <p className="text-xl text-primary">{movie?.title}</p>
                  <div className="flex flex-wrap gap-2">{movieDetails?.genres.map(genre => (
                    <p className="text-muted-foreground flex" key={genre.id}>{genre.name}</p>
                  ))}
                  </div>
                  <div className="flex items-center gap-2">
                  <p className="text-muted-foreground">
                    {movieDetails && movieDetails.release_date ? format(new Date(movieDetails.release_date),'yyyy') : ''}
                  </p>                    
                  <p className="text-muted-foreground">{movieDetails ? formatRuntime(movieDetails.runtime) : 'N/A'}</p>
                  </div>                  
                <p className="text-muted-foreground flex items-center gap-2"><Star className="text-amber-300 fill-amber-300 size-5" />{movieDetails?.vote_average.toFixed(2)}</p>
                </div>
              </div>
              <Separator className="mt-2" />
              <ScrollArea className="max-h-[250px] overflow-y-auto px-2 py-2">
           <h2 className="text-xl text-primary">Sinopse</h2>
            <p className="text-muted-foreground text-base w-[460px] py-2">{movieDetails?.overview === "" ? "Essa série não tem sinopse" : movieDetails?.overview }</p>
          </ScrollArea>
            </Card>
          </div>
        </div>
      </Link>
    )}
    </>
  )
}
