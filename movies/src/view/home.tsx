import { Hero } from "./movies/components/hero";
import { MoviesTrending } from "./movies/movies-trending";
import { TvShowsTrending } from "./tv-show/components/tv-show-trending";

export function Home() {
    return (
        <>
        <Hero />
        <div className="px-5 py-4">
        <div className="flex justify-between items-center px-2 py-4">
        <h3 className="text-primary text-lg lg:text-xl">Filmes em tendência</h3>
        </div>
        <MoviesTrending />

        <div className="flex justify-between items-center px-2 py-4">
        <h3 className="text-primary text-lg lg:text-xl">Séries Em tendência</h3>
      </div>
      <TvShowsTrending />
        </div>

        </>
    )
}