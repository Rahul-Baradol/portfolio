import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1 });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
