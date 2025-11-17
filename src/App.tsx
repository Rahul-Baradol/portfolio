import { NPhaseScroller } from "./components/n-phase-scroller";
import PhaseOne from "./components/phase-one";
import { TextMarquee } from "./components/text-marquee";

function App() {
  return (
    <div className="relative w-screen h-screen bg-black text-white">
      {/* <GithubLink /> */}
      <TextMarquee />
      <NPhaseScroller
        phases={[
          {
            id: "one",
            content: () => <PhaseOne />,
          },
          // {
          //   id: "two",
          //   content: () => <PhaseTwo />,
          // },
          // {
          //   id: "three",
          //   content: () => <PhaseThree />,
          // },
          // {
          //   id: "four",
          //   content: () => <PhaseFour />
          // },
        ]}
      />
    </div>
  );
}

export default App;
