import { Hero } from "./components/hero";
import { MoviesTrending } from "../movies/components/movies-trending";
import { TvShowTrending } from "../tv-show/components/tv-show-trending";

export function Home() {
    return (
        <>
        <Hero />
        <div className="px-5 py-4">
        <MoviesTrending />
        <TvShowTrending />
        </div>

        </>
    )
}