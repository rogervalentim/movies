import { Hero } from "../home/components/hero"
import { MoviesNowPlaying } from "./components/movies-now-playing"
import { MoviesPopular } from "./components/movies-popular"
import { MoviesRated } from "./components/movies-rated"
import { MoviesTrending } from "./components/movies-trending"

export function Movies() {
    return (
        <>
        <Hero />
        <div className="px-5 py-4">
        <MoviesTrending />
        <MoviesRated />
        <MoviesPopular />
        <MoviesNowPlaying />
        </div>
        </>
    )
}