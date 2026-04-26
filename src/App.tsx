import { lazy, Suspense, useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { ThemeProvider } from "./lib/theme";

const Home = lazy(() => import("./pages/home").then((m) => ({ default: m.Home })));
const PRsPage = lazy(() => import("./pages/prs").then((m) => ({ default: m.PRsPage })));
const NotFound = lazy(() => import("./components/not-found"));

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
        <Suspense>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/prs" element={<PRsPage />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
