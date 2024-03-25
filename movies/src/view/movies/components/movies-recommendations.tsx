import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"; 
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card } from "@/components/card";
import { TmdbProps } from "@/types/types";
import { SkeletonCategory } from "@/components/skeleton-category";


const apiKey = import.meta.env.VITE_API_KEY;


export function MoviesRecommendations() {
  const { movieId } = useParams();
  const { data: movieRecommendations, isLoading: movieIsLoading } = useQuery<TmdbProps[]>({
    queryKey: ["get-movie-recommendations", movieId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      
      return data.results;
    },
    enabled: !!movieId,
  });

  
  if (!movieId) {
    return <div>Nenhum ID de filme fornecido</div>;
  }

  if (movieIsLoading) {
    return (
    <>
     <SkeletonCategory />
    </>
    )
  }


  if (!movieRecommendations) {
    return <div>Filme não encontrado</div>;
  }

  return (
    <div className="px-5">
    <div className="flex justify-between items-center px-2 py-4">
        <h3 className="text-primary text-lg lg:text-xl">{movieRecommendations.length === 0 ? "" : "Filmes recomendados"}</h3>  
        </div>    
  <h2 className="text-primary text-lg lg:text-xl ml-5"></h2>            
    <Carousel>
      <CarouselContent className="-ml-2 py-2 md:-ml-4">
        {movieRecommendations.length === 0 ? ""
         : movieRecommendations.map((movie: TmdbProps) =>
           (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
          <CarouselItem className="relative w-40 basis-1/3 md:basis-1/4 md:w-52 lg:w-64">
            <Card 
             id={movie.id}
             poster_path={movie.poster_path}
             title={movie.title}
             vote_average={movie.vote_average}
            />
          </CarouselItem>
            </Link>
           )
          )}
      </CarouselContent>
    </Carousel>
    </div>
  ); 
}
