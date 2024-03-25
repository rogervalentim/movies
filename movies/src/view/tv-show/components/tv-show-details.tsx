import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { TvShowDetailsProps } from "@/types/types";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const apiKey = import.meta.env.VITE_API_KEY;

import film from  "@/assets/film.svg";

import { useState, useEffect } from "react";
import { Hero } from "@/components/hero";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Videos } from "@/components/videos";
import { Cast } from "@/components/cast";
import { Images } from "@/components/images";
import { TvShowRecommendations } from "./tv-show-recommendations";
import { TvShowSimilar } from "./tv-show-similar";
import { TvShowEpisodes } from "./tv-show-episodes";


export function TvShowDetails() {
  const { tvShowId } = useParams();

  useEffect(()=> {
    setShowOverview(true)
    setShowImages(false)
    setShowVideos(false)
    setShowEpisodes(false)
  }, [tvShowId])

  const [showOverview, setShowOverview] = useState(true)
  const [showImages, setShowImages] = useState(false)
  const [showVideos, setShowVideos] = useState(false)
  const [showEpisodes, setShowEpisodes] = useState(false)

  const { data: tvShowDetails, isLoading } = useQuery<TvShowDetailsProps>({
    queryKey: ["get-movie-details", tvShowId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      return data;
    },
    enabled: !!tvShowId,
  });

  if (isLoading) {
    return (
      <>
      <Skeleton className="w-full object-cover h-[400px] md:h-[480px]" />
        <Skeleton className="h-5 w-56 mt-8 ml-5"/>
        <Carousel className="px-5">
          <CarouselContent className="-ml-2 mt-10 md:-ml-4">
            {[...Array(20)].map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5">
                <Skeleton className="h-[380px] rounded-none w-64" />
                <Skeleton className="h-5 w-56 mt-2 rounded-none" />
                <Skeleton className="h-5 w-44 mt-2 rounded-none" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </>
    );
  }

  if (!tvShowDetails) {
    return <div>Filme não encontrado</div>;
  }

  function toggleOverview() {
    setShowOverview(true)
    setShowImages(false)
    setShowVideos(false)
    setShowEpisodes(false)
  }

  function toggleImages() {
    setShowImages(true)
    setShowOverview(false)
    setShowVideos(false)
    setShowEpisodes(false)
  }

  function toggleVideos() {
    setShowVideos(true)
    setShowImages(false)
    setShowOverview(false)
    setShowEpisodes(false)
  }

  function toggleEpisodes() {
    setShowEpisodes(true)
    setShowVideos(false)
    setShowImages(false)
    setShowOverview(false)
  }

  return ( 
    <>
      <Hero tvShowDetails={tvShowDetails} />

      <section className="py-6">

<ToggleGroup type="single" size="sm">
  <ToggleGroupItem value="Visão geral" className={showOverview ? "bg-white text-black  font-semibold" : ""} disabled={showOverview} onClick={toggleOverview}>Visão geral</ToggleGroupItem>
  <ToggleGroupItem value="Episódios" disabled={showEpisodes} onClick={toggleEpisodes}>Episódios</ToggleGroupItem>
  <ToggleGroupItem value="Imagens" disabled={showImages} onClick={toggleImages}>Imagens</ToggleGroupItem>
  <ToggleGroupItem value="Vídeos" disabled={showVideos} onClick={toggleVideos}>Vídeos</ToggleGroupItem>
</ToggleGroup>


        {showOverview && (
          <>
          <div className="flex lg:px-5 gap-6 py-4">
            
            <div>
          <img 
        src={tvShowDetails?.poster_path === null ? film : `https://image.tmdb.org/t/p/w342${tvShowDetails?.poster_path}`} 
        alt={tvShowDetails?.name}
        className="hidden lg:flex h-[450px] border-4 border-border"
      />
      </div>
      <div className="w-full lg:w-[80%]">
      <h2 className="text-primary text-lg">Sinopse</h2>
        <p className="text-lg text-muted-foreground py-2">{tvShowDetails?.overview === "" ? "Esta série não tem sinopse" : tvShowDetails?.overview}</p>

        <ul className="space-y-4 py-4">
            <li className="flex flex-wrap gap-3">
            <p>Gêneros</p>
          {tvShowDetails?.genres.map(genre => (
            <p key={genre.id} className="text-muted-foreground">
              {genre.name}
            </p>
          ))}
          </li>
          <li className="flex gap-3">
            <p>Produções</p>
            <p className="text-muted-foreground">{tvShowDetails?.production_companies?.map(company => company.name).join(", ")}</p>
          </li>
          <li className="flex gap-3">
            <p>Temporadas</p>
            <p className="text-muted-foreground">{tvShowDetails?.number_of_seasons}</p>
          </li>
          <li className="flex gap-3">
            <p>Epsódios</p>
            <p className="text-muted-foreground">{tvShowDetails?.number_of_episodes}</p>
          </li>
          <li className="flex items-center flex-wrap gap-3">
            <p>Networks</p>
            {tvShowDetails?.networks && (
  <div className="flex flex-wrap gap-3">
    {tvShowDetails?.networks.map(network => (
      <>
      <Badge variant="secondary" className="w-fit">
      <img
        key={network.id}
        src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
        alt={network.name}
        className="h-6"
      />
      </Badge>
     </>
    ))}
  </div>
)}
          </li>
        </ul>
      </div>

          </div>

          <Cast />
      </>
        )}
  
      {showImages  && <Images />}
      {showVideos && <Videos />}
      {showEpisodes && <TvShowEpisodes />}
  </section>
      <TvShowSimilar />
      <TvShowRecommendations />

    </>
  );
}
