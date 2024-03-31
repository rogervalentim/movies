import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Film, Loader } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { EpisodesProps } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const apiKey = import.meta.env.VITE_API_KEY;

export function TvShowEpisodes() {
  const { tvShowId } = useParams()
  const [selectedSeason, setSelectedSeason] = useState(1);

  const { data: tvShowSeasons, isLoading: tvShowSeasonsIsLoading } = useQuery<EpisodesProps[]>({
    queryKey: ["get-tv-show-seasons", tvShowId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();

      return data.seasons;
    },
    enabled: !!tvShowId,
  });

  const { data: tvShowEpisodes, isLoading: tvShowEpisodesIsLoading } = useQuery<EpisodesProps[]>({
    queryKey: ["get-tv-show-episodes", tvShowId, selectedSeason], // Inclua a temporada selecionada na chave da consulta
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}/season/${selectedSeason}?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
      return data.episodes;
    },
    enabled: !!tvShowId && !!selectedSeason,
  });

  
  const handleSeasonChange = (value: number): void => {
    setSelectedSeason(Number(value));
  };

  if (tvShowSeasonsIsLoading || tvShowEpisodesIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={50} color="#fff" />
      </div>
    );
  }

  return (
    <section className="px-5 py-4">
      <div className="flex items-center gap-3">
      <Select  value={String(selectedSeason)} onValueChange={(value) => handleSeasonChange(Number(value))}>
              <SelectTrigger className="w-[150px]">
                <SelectValue>
                  {selectedSeason} - Temporada
                  </SelectValue>
              </SelectTrigger>
              <SelectContent>
              {tvShowSeasons
    ?.filter(season => season.name !== "Especiais") // Filter out special seasons
    .map((_, index) => (
                  <SelectItem key={index} value={String(index + 1)}>
                    {index + 1} - Temporada
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
 

      <p className="text-base text-muted-foreground">{tvShowEpisodes?.length} Episódios</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
        {tvShowEpisodes?.map((item) => (
          <div key={item.id}>
            {item.still_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w780${item.still_path}`}
                className="cursor-pointer border-border border-4 w-full h-[190px]"
                alt={item.name}
              />
            ) : (
              <Film
                className="cursor-pointer border-border border-4 w-full h-[190px]"
              />
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
              <p className="text-muted-foreground font-semibold">E{item.episode_number}</p>
              <h3 className="py-2 text-base font-semibold">{item.name}</h3>
              </div>
              <Separator />
            <p className="py-1 text-sm text-zinc-300">
              {item.overview === "" ? "Episódio sem descrição" : item.overview}
            </p>
              <p className="text-muted-foreground">
                {format(new Date(item.air_date), "dd/MM/yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
