import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./view/home/home";
import { Movies } from "./view/movies/movies";
import { TvShow } from "./view/tv-show/tv-show";
import { MovieDetails } from "./view/movies/components/movies-details";
import { Actor } from "./view/actor/actor";
import { TvShowDetails } from "./view/tv-show/components/tv-show-details";
import { Footer } from "./components/footer";
import { ScrollToTop } from "./components/scroll-to-top";

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TvShow />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/actor/:actorId" element={<Actor />} />
          <Route path="/tv/:tvShowId" element={<TvShowDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
