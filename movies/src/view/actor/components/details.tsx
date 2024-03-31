import { ActorDetails } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader, User } from "lucide-react";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_API_KEY;


export function Details() {
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

  if(actorIsLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" size={50} color="#fff" /> 
      </div>   
    )
  }
    return (
        <div className="flex flex-col items-center justify-center gap-4 md:flex md:justify-center md:flex-row">
          {actorDetails?.profile_path ? (
            <img 
             className="cursor-pointer w-72 h-80 object-cover p-1 bg-zinc-800/60"
             src={`https://image.tmdb.org/t/p/w342${actorDetails?.profile_path}`} 
             alt={actorDetails?.name} />
          ) :  (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <User
               className="h-full w-full object-cover text-zinc-500"                          
              />
           </div>
        )}
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
    )
}