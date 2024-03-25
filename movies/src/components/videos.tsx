import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader, Play, X } from "lucide-react";
import { VideosResponse } from "@/types/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const apiKey = import.meta.env.VITE_API_KEY;

export function Videos() {
  const { movieId, tvShowId } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Todos");
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState("");

  const openModal = (videoId: string) => {
    setSelectedVideoId(videoId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideoId("");
    setModalOpen(false);
  };

  const { data: videos, isLoading: movieVideosIsLoading } = useQuery<VideosResponse>({
    queryKey: ["get-videos", movieId || tvShowId],
    queryFn: async () => {
      const contentType = movieId ? "movie" : "tv";
      const contentId = movieId || tvShowId;
  
      const response = await fetch(
        `https://api.themoviedb.org/3/${contentType}/${contentId}/videos?api_key=${apiKey}`
      );
      const data = await response.json();
  
      return data;
    },
    enabled: !!movieId || !!tvShowId
  });
  

  useEffect(() => {
    if (videos?.results) {
      const types = videos.results.map((video) => video.type);
      const uniqueTypes = ["Todos", ...Array.from(new Set(types))];      
      setUniqueTypes(uniqueTypes);
    }
  }, [videos]);

  const handleTypeChange = (value: string): void => {
    setSelectedType(value);
  };

  let filteredVideos = videos?.results || [];

  if (selectedType !== "Todos") {
    filteredVideos = filteredVideos.filter((video) => video.type === selectedType);
  }



  const videoThumbnails =
    videos?.results.length === 0
      ? ""
      : filteredVideos?.map((video) => (
          <div className="flex flex-col" key={video.id}>
            <div className="relative">
              <img
                src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                alt={video.name}
                className="cursor-pointer border-4 w-full  h-[190px] border-border"
              />
              <button className="absolute inset-0 flex justify-center items-center" onClick={() => openModal(video.key)}>
                <div className="rounded-full bg-black/60 flex items-center justify-center w-10 h-10">
                  <Play className="text-gray-300 fill-gray-300 size-6" />
                </div>
              </button>
            </div>
            <div className="flex flex-col mt-2">
              <p className="text-primary text-base lg:text-lg">{video.name}</p>
              <p className="text-muted-foreground text-sm lg:text-base">{video.type}</p>
            </div>
          </div>
        ));

        if(movieVideosIsLoading) {
            return  (
            <div className="flex justify-center items-center h-screen">
            <Loader className="animate-spin" size={50} color="#fff" /> 
          </div>   
            )
        }

  return (
    <div className="px-5 py-4">
        <div className="flex items-center gap-3">
        {uniqueTypes.length > 0 ? (
          <div className="flex"> 
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue>
                  {selectedType}
                  </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : ""}
        <p className="text-muted-foreground text-base">{filteredVideos?.length} videos</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">{videoThumbnails}</div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="p-4 rounded-lg">
            <button className="absolute top-1 right-1 z-100 p-3 text-3xl bg-black/60 rounded-full hover:text-primary transition" onClick={closeModal}>
              <X className="text-2xl text-white" />
            </button>
            <div className="flex justify-center items-center">
              <iframe title="YouTube Video" allow="autoplay; encrypted-media" className="max-w-full w-[700px] h-screen m-5 lg:m-20 border-none" src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`} allowFullScreen></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
