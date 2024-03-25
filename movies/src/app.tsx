import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./view/home/home";
import { Movies } from "./view/movies/movies";
import { TvShow } from "./view/tv-show/tv-show";
import { MovieDetails } from "./view/movies/components/movies-details";

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TvShow />} />
          <Route path="movie/:movieId" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
