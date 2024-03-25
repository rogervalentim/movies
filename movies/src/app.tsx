import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./view/home/home";
import { Movies } from "./view/movies/movies";

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </div>
    </Router>
  );
}
