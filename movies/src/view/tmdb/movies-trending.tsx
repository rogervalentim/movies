import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Card } from "@/components/card";
import { Link } from "react-router-dom";
import { SkeletonCategory } from "@/components/skeleton-category";
import { CardProps } from "@/types/types";

const apiKey = import.meta.env.VITE_API_KEY;

export function MoviesTrending() {
  const { data: MoviesTrending, isLoading } = useQuery<CardProps[]>({
    queryKey: ["get-trending-movies"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      return data.results;
    }
  });

  if (isLoading) {
    return <SkeletonCategory />;
  }

  return (
    <div className="px-5 py-4">
      <div className="flex justify-between items-center px-2 py-4">
        <h3 className="text-primary text-lg lg:text-xl">Em tendência</h3>
      </div>
      <Carousel>
        <CarouselContent className="-ml-2 py-2 md:-ml-4">
          {MoviesTrending &&
            MoviesTrending.map((movie: CardProps) =>
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <CarouselItem className="relative w-40 basis-1/3 md:basis-1/4 md:w-52 lg:w-64">
                  <Card
                    id={movie.id}
                    name={movie.name}
                    poster_path={movie.poster_path}
                    title={movie.title}
                    vote_average={movie.vote_average}
                  />
                </CarouselItem>
              </Link>
            )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
