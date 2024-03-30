import { useQuery } from "@tanstack/react-query";
import { MovieDetailsProps } from "@/types/types";
import { useParams } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { useState, useEffect } from "react";
import film from "@/assets/film.svg";
import { format } from "date-fns";
import { Hero } from "@/components/hero";
import { MoviesSimilar } from "./movies-similar";
import { MoviesRecommendations } from "./movies-recommendations";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Images } from "@/components/images";
import { Videos } from "@/components/videos";
import { Cast } from "@/components/cast";
import { Skeleton } from "@/components/ui/skeleton";


const apiKey = import.meta.env.VITE_API_KEY;

export function MovieDetails() {
  const [showOverview, setShowOverview] = useState(true)
  const [showImages, setShowImages] = useState(false)
  const [showVideos, setShowVideos] = useState(false)

  const { movieId } = useParams();

   
  useEffect(()=> {
    setShowOverview(true)
    setShowImages(false)
    setShowVideos(false)
  }, [movieId])
  
  const { data: movieDetails, isLoading: movieIsLoading } = useQuery<MovieDetailsProps>({
    queryKey: ["get-movie-details", movieId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      return data;
    },
    enabled: !!movieId, 
  });

  if (!movieId) {
    return <div>Nenhum ID de filme fornecido</div>;
  }

  if (movieIsLoading) {
    return (
      <>
      <Skeleton className="w-full object-cover h-[400px] lg:h-[480px]" />
      <Skeleton className="h-5 w-56 mt-8 ml-5"/>
      <Carousel className="px-5">
            <CarouselContent className="-ml-2 mt-10 md:-ml-4">
              {[...Array(20)].map((_, index) => (
                <CarouselItem key={index}  className="basis-1/3 lg:basis-1/4 relative w-48 lg:w-64">
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

  if (!movieDetails) {
    return <div>Filme não encontrado</div>;
  }

  function toggleOverview() {
    setShowOverview(true)
    setShowImages(false)
    setShowVideos(false)
  }

  function toggleImages() {
    setShowImages(true)
    setShowOverview(false)
    setShowVideos(false)
  }

  function toggleVideos() {
    setShowVideos(true)
    setShowOverview(false)
    setShowImages(false)
  }

  function formatRuntime(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
}


  return (
    <>
    <Hero movieDetails={movieDetails} />
   
  <section className=" py-6">
  <ToggleGroup type="single" size="sm">
  <ToggleGroupItem value="Visão geral" disabled={showOverview} className={showOverview ? "bg-white text-black  font-semibold" : ""}  onClick={toggleOverview}>Visão geral</ToggleGroupItem>
  <ToggleGroupItem value="Imagens" disabled={showImages} onClick={toggleImages}>Imagens</ToggleGroupItem>
  <ToggleGroupItem value="Vídeos" disabled={showVideos} onClick={toggleVideos}>Vídeos</ToggleGroupItem>
</ToggleGroup>

        {showOverview && (
          <>
    <div className="flex px-5 flex-row gap-6 py-4">  
    <div className="aspect-[2/3] max-w-[350px] flex-shrink-0 mr-12 hidden lg:block">    <img 
        src={movieDetails?.poster_path === null ? film : `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`} 
        alt={movieDetails?.title}
        className="w-full h-full object-cover p-1 bg-zinc-800"
      />
      </div>
      <div className="w-full lg:w-[80%]">
        <h2 className="text-primary text-lg">Sinopse</h2>
        <p className="text-base lg:text-lg  text-muted-foreground py-2">{movieDetails?.overview === "" ? "Esta filme não tem sinopse" : movieDetails?.overview}</p>
        <ul className="space-y-4 py-4">
          {movieDetails?.release_date ? (
          <li className="flex gap-3">
            <p>Data de lançamento</p>
            <p className="text-muted-foreground">
                    {movieDetails && movieDetails.release_date ? format(new Date(movieDetails.release_date),'dd/MM/yyyy') : ''}
                  </p>          
          </li>
          ) : 'Data de lançamento não divulgada'}

          {movieDetails?.runtime ? (
          <li className="flex gap-3">
            <p>Duração</p>
            <p className="text-muted-foreground">{formatRuntime(movieDetails?.runtime)}</p>
          </li>
          ) : "Duração não especificada"}
          <li className="flex flex-wrap gap-3">
            <p>Gêneros</p>
          {movieDetails?.genres.map(genre => (
            <p key={genre.id} className="text-muted-foreground">
              {genre.name}
            </p>
          ))}
          </li>
          {movieDetails?.budget ? (
          <li className="flex gap-3">
            <p>Bilheteria</p>
            <p className="text-muted-foreground">
            {movieDetails?.budget.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </li>
          ) : ""}
          
          <li className="flex gap-3">
            <p>Produções</p>
            <p className="text-muted-foreground">{movieDetails?.production_companies?.map(company => company.name).join(", ")}</p>
          </li>
        </ul>
      </div>

          </div>
      <Cast />
      </>
        )}

  
     {showVideos && <Videos />}
      {showImages  && <Images />}
  </section>
      <MoviesSimilar />
      <MoviesRecommendations />
    </>
  );
}
