import { Hero } from "./tmdb/components/hero";
import { MoviesTrending } from "./tmdb/movies-trending";

export function Home() {
    return (
        <>
        <Hero />
        <MoviesTrending />
        </>
    )
}