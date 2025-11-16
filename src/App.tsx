import { NPhaseScroller } from "./components/n-phase-scroller";
import PhaseOne from "./components/phase-one";
import PhaseTwo from "./components/phase-two";
import PhaseThree from "./components/phase-three";
import PhaseFour from "./components/phase-four";

function App() {
  return (
    <div className="w-screen h-screen bg-black text-white">
      <NPhaseScroller
        phases={[
          {
            id: "one",
            content: ({ scrollNext }) => <PhaseOne scrollNext={scrollNext} />,
          },
          {
            id: "two",
            content: ({ scrollNext }) => <PhaseTwo scrollNext={scrollNext} />,
          },
          {
            id: "three",
            content: ({ scrollNext }) => <PhaseThree scrollNext={scrollNext} />,
          },
          {
            id: "four",
            content: () => <PhaseFour />
          },
        ]}
      />
    </div>
  );
}

export default App;
