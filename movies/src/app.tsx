import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { Header } from "./components/header";
import { Home } from "./view/home";

export function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}
