import { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import Lab from "./pages/lab";
import NotFound from "./components/not-found";
import { Layout } from "./layout";
import BreadcrumbDocs from "./pages/docs/breadcrumb-navigator-doc";

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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/lab/breadcrumb-navigator" element={<BreadcrumbDocs />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
