import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import NotFound from "./components/not-found";
import { Layout } from "./layout";
import { ThemeProvider } from "./lib/theme";

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
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
