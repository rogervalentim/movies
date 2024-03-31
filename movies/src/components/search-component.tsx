import { Link } from "react-router-dom";
import { SearchProps } from "@/types/types";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Film, MoreHorizontal, User } from "lucide-react";

interface SearchPropsComponent {
  searchResults: SearchProps[];
  clearSearch: () => void;
  searchIsLoading: boolean;
}

export function SearchComponent({
  searchResults,
  clearSearch,
  searchIsLoading,
}: SearchPropsComponent) {
  return (
    <div className="grid grid-cols-1 justify-center z-50 w-full md:w-[400px] lg:w-[600px] absolute md:mt-12">
      <ScrollArea className="z-50 border-t p-2 bg-[#121212] max-h-[320px] lg:max-h-[500px] flex justify-center items-center  overflow-y-auto w-full lg:w-[600px]">
        {searchIsLoading && (
          <div className="animate-bounce">
            <MoreHorizontal />
          </div>
        )}
        {searchResults?.map((result) => (
          <Link
            to={
              result.media_type === "movie"
                ? `/movie/${result.id}`
                : result.media_type === "tv"
                ? `/tv/${result.id}`
                : `/actor/${result.id}`
            }
            key={result.id}
            onClick={clearSearch}
            className="w-full"
          >
            <div className="flex gap-4 w-full items-center py-1 hover:bg-zinc-800">
              {result.profile_path === null ? (
               <User
                className="h-14 w-14 text-zinc-500 lg:h-20 lg:w-20"
               />
            ) : result.poster_path === null ? (
              <Film
                className="h-14 w-14 text-zinc-500 lg:h-20 lg:w-20"
              />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w185${result.poster_path || result.profile_path}`}
                  className="h-14 w-14 lg:h-20 lg:w-20"
                  alt={result.title || result.name}
                />
             )}

              <div className="flex flex-col">
                <p className="w-64 text-white  text-base lg:text-lg">
                  {result.name || result.title}
                </p>
                <p className="w-64 text-muted-foreground">
                  {result.media_type === "movie"
                    ? "Filme"
                    : result.media_type === "tv"
                    ? "Série"
                    : result.known_for_department === "Acting"
                    ? "Ator"
                    : result.known_for_department === "Directing"
                    ? "Diretor"
                    : ""}
                </p>
              </div>
            </div>
            <Separator />
          </Link>
        ))}
      </ScrollArea>
    </div>
  );
}
