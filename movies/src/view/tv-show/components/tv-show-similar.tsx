import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"; 
import { Carousel, CarouselContent, CarouselItem } from "../../../components/ui/carousel";
import { Card } from "../../../components/card";
import { TmdbProps } from "@/types/types";
import { SkeletonCategory } from "../../../components/skeleton-category";

const apiKey = import.meta.env.VITE_API_KEY;

export function TvShowSimilar() {
  const { tvShowId } = useParams();
  const { data: tvShowSimilar, isLoading: tvShowSimilarIsLoading } = useQuery<TmdbProps[]>({
    queryKey: ["get-tv-similar", tvShowId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}/similar?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      await new Promise(resolve => setTimeout(resolve, 2000));

      return data.results;
    },
    enabled: !!tvShowId,
  });


  if (tvShowSimilarIsLoading) {
    return (
    <>
    <SkeletonCategory />
    </>
    )
  }

  return (
    <div className="px-5">
    <div className="flex justify-between items-center px-2 py-4">
        <h3 className="text-primary text-lg lg:text-xl">{tvShowSimilar?.length === 0 ? "" : "Mais como este"}</h3>  
        </div>  
        
    <Carousel>
      <CarouselContent className="-ml-2 py-2 md:-ml-4">
        {tvShowSimilar?.length === 0 ? ""
         : tvShowSimilar?.map((tv: TmdbProps) =>
           (
            <Link to={`/tv/${tv.id}`} key={tv.id}>
          <CarouselItem className="relative w-40 basis-1/3 md:basis-1/4 md:w-52 lg:w-64">
            <Card 
             id={tv.id}
             poster_path={tv.poster_path}
             name={tv.name}
             vote_average={tv.vote_average}
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
