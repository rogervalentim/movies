import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"; 
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card } from "@/components/card";
import { TmdbProps } from "@/types/types";
import { SkeletonCategory } from "@/components/skeleton-category";

const apiKey = "fb8991fa7ac1a75e1cd0dd9805822f4c";

export function TvShowRecommendations() {
  const { tvShowId } = useParams();
  const { data: tvShowRecommendations, isLoading: tvShowRecommendationIsLoading } = useQuery<TmdbProps[]>({
    queryKey: ["get-tv-recommendations", tvShowId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      console.log("recommendations series", data)

      await new Promise(resolve => setTimeout(resolve, 2000));

      return data.results;
    },
    enabled: !!tvShowId,
  });


  if (tvShowRecommendationIsLoading) {
    return (
    <>
    <SkeletonCategory />
    </>
    )
  }

  return (
    <div className="px-5">
    <div className="flex justify-between items-center px-2 py-4">
        <h3 className="text-primary text-lg lg:text-xl">{tvShowRecommendations?.length === 0 ? "" : "Séries recomendados"}</h3>  
        </div>  
        
    <Carousel>
      <CarouselContent className="-ml-2 py-2 md:-ml-4">
        {tvShowRecommendations?.length === 0 ? ""
         : tvShowRecommendations?.map((tv: TmdbProps) =>
           (
            <Link to={`/tv/${tv.id}`} key={tv.id}>
          <CarouselItem  className="relative w-40 basis-1/3 md:basis-1/4 md:w-52 lg:w-64">
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
