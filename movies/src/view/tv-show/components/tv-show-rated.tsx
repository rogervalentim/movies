import { useQuery } from "@tanstack/react-query";
import { TmdbProps } from "@/types/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Card } from "@/components/card";
import { Link } from "react-router-dom";
import { SkeletonCategory } from "@/components/skeleton-category";

const apiKey = import.meta.env.VITE_API_KEY;

export function TvShowRated() {
  const { data: tvShowsRated, isLoading } = useQuery<TmdbProps[]>({
    queryKey: ["get-rated-tv"],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      return data.results;
    }
  });

  if (isLoading) {
    return <SkeletonCategory />;
  }

  return (
    <>
      <div className="flex justify-between items-center px-2 py-4">
        <h3 className="text-primary text-lg lg:text-xl">
          Séries melhores classificadas
        </h3>
      </div>
      <Carousel>
        <CarouselContent className="-ml-2 py-2 md:-ml-4">
          {tvShowsRated &&
            tvShowsRated.map((tv: TmdbProps) =>
              <Link to={`/tv/${tv.id}`} key={tv.id}>
                <CarouselItem className="relative w-40 basis-1/3 md:basis-1/4 md:w-52 lg:w-64">
                  <Card
                    id={tv.id}
                    poster_path={tv.poster_path}
                    title={tv.name}
                    vote_average={tv.vote_average}
                  />
                </CarouselItem>
              </Link>
            )}
        </CarouselContent>
      </Carousel>
    </>
  );
}
