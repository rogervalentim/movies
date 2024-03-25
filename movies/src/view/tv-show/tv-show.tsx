import { HeroTvShow } from "./components/hero-tv-show";
import { TvShowAiringToday } from "./components/tv-show-airing-today";
import { TvShowPopular } from "./components/tv-show-popular";
import { TvShowRated } from "./components/tv-show-rated";
import { TvShowTrending } from "./components/tv-show-trending";

export function TvShow() {
    return (
        <>
        <HeroTvShow />
        <div className="px-5 py-4">
         <TvShowTrending />
         <TvShowRated />
         <TvShowPopular />
         <TvShowAiringToday />
        </div>
        </>
    )
}