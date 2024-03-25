import { ActorDetails, ProfilesProps, TmdbProps } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import actorImg from "../../assets/user.svg";
import { Loader, Star } from "lucide-react";
import film from "../../assets/film.svg";
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const apiKey = import.meta.env.VITE_API_KEY;

export function Actor() {
  const [showMovies,setShowMovies] = useState(true);
  const [showPhotos, setShowPhotos] = useState(false);

  
  const { actorId } = useParams();

  const { data: actorDetails, isLoading: actorIsLoading } = useQuery<ActorDetails>({
      queryKey: ["actor-details", actorId],
      queryFn: async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}&language=pt-BR`
        );
        const data = await response.json();
              
        return data;
      },
      enabled: !!actorId,
  });

  const { data: actorPhotos, isLoading: actorPhotosIsLoading } = useQuery<ProfilesProps[]>({
    queryKey: ["actor-photos", actorId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}/images?api_key=${apiKey}&language=pt-BR`
      );
      const data = await response.json();
            
      return data.profiles;
    },
    enabled: !!actorId,
});

  const { data: actorCredits, isLoading: creditsIsLoading } = useQuery<TmdbProps[]>({
      queryKey: ["actor-credits", actorId],
      queryFn: async () => {
          const response = await fetch(
              `https://api.themoviedb.org/3/person/${actorId}/combined_credits?api_key=${apiKey}&language=pt-BR`
          );
          const data = await response.json();
          
          return data.cast;
      },
      enabled: !!actorId,
  });

  if (actorPhotosIsLoading || actorIsLoading || creditsIsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin" size={50} color="#fff" /> 
    </div>   
      ) 
  }

  function toggleMovies() {
    setShowMovies(true);
    setShowPhotos(false);
    // setShowVideos(false);
  }
  
  function togglePhotos() {
    setShowPhotos(true);
    // setShowVideos(false);
    setShowMovies(false);
  }

  // function toggleVideos() {
  //   setShowVideos(true);
  //   setShowMovies(false);
  //   setShowPhotos(false);
  // }


  return (
      <section className="px-6 py-4">
        <div className="flex flex-col justify-center gap-4 md:flex-row">

          <img 
              className="block cursor-pointer object-cover border-4  border-border h-[270px] w-48 lg:w-72 lg:h-[350px]"
              src={actorDetails?.profile_path === null ? actorImg : 
              `https://image.tmdb.org/t/p/w342${actorDetails?.profile_path}`} 
              alt={actorDetails?.name} 
          />
        <div className="flex md:flex-col md:justify-center md:items-center lg:flex-row gap-3">
          <div>
          <h3 className="text-primary text-lg  lg:text-xl">
              {actorDetails?.name}
          </h3>         
          <p className="text-muted-foreground w-[90%] text-base lg:text-lg">{actorDetails?.biography === "" ? "Pessoa sem Biografia" : actorDetails?.biography}</p>
          <h3 className="text-primary text-lg  lg:text-xl mt-4">
              Data de nascimento
          </h3>       
          <p className="text-muted-foreground text-base lg:text-lg"> {actorDetails && actorDetails.birthday ? format(new Date(actorDetails.birthday), "dd/MM/yyyy") : "Data de nascimento desconhecida"}</p>

    
          <h3 className="text-primary text-lg  lg:text-xl mt-4">
              Local de nascimento
          </h3>   

          <p className="text-muted-foreground text-base  lg:text-lg">{actorDetails?.place_of_birth === null ? "Local de nascimento desconhecido" : actorDetails?.place_of_birth}</p>

          <h3 className="text-primary text-lg  lg:text-xl mt-4">
              Reconhecido por
          </h3>  

          <p className="text-muted-foreground text-base  lg:text-lg">{actorDetails?.known_for_department === "Acting" ? "Atuar" : "Dirigir"}</p>

          </div>
        </div>
          </div>

          <div className="flex justify-center py-6 gap-3 cursor-pointer">
            <Button  variant={showMovies ? 'default' : 'outline'} onClick={toggleMovies} className={showMovies ? 'text-black font-semibold text-lg' : 'text-primary font-semibold text-lg'}>Participações</Button>
            <Button  variant={showPhotos ? 'default' : 'outline'} onClick={togglePhotos} className={showPhotos ? 'text-black font-semibold text-lg' : 'text-primary font-semibold text-lg'}>Fotos</Button>
            {/* <Button  variant={showVideos ? 'secondary' : 'outline'} onClick={toggleVideos} className="text-primary text-lg">Videos</Button> */}
          </div>

        {showMovies && (
          <>
     
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 py-4">
          {actorCredits?.map((item: TmdbProps) => (
          <Link to={item.media_type === "movie" ? `/movie/${item?.id}`: `/tv/${item?.id}`} key={item.id}>
                  <img 
                      src={item?.poster_path === null ? film : `https://image.tmdb.org/t/p/w342${item?.poster_path}`} 
                      alt={item?.title} 
                      className="cursor-pointer w-48 h-[270px] border-4 border-border lg:w-72 lg:h-[350px]"
                  />
                  <p className="text-white text-base w-44 lg:text-lg lg:w-56 mt-2">
              {item?.title || item?.name}
            </p>
        <div className="flex items-center gap-2 mt-3">
         <span><Star className="fill-amber-300 text-amber-300 size-5" /></span>
         <p className="text-muted-foreground text-base">{item?.vote_average.toFixed(2)}</p>
        </div>
          </Link>
          ))}
      </div>   
      </>
        )}

{showPhotos && (
  <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 py-4">
    {actorPhotos?.map(photo => (
      <img 
        src={photo.file_path === null ? film : `https://image.tmdb.org/t/p/w342${photo.file_path}`} 
        alt="actor image"
        key={photo.id}
        className="cursor-pointer  border-4 border-border  w-48 h-[270px] lg:w-72 lg:h-[350px] mt-4"
      />
    ))}
  </div>   
)}
</section>
  );
}
