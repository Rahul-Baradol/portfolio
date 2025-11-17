import { NPhaseScroller } from "./components/n-phase-scroller";
import PhaseOne from "./components/phase-one";
import PhaseTwo from "./components/phase-two";
import PhaseThree from "./components/phase-three";
import PhaseFour from "./components/phase-four";
import { TextMarquee } from "./components/text-marquee";
import { GithubLink } from "./components/github-link";

function App() {
  return (
    <div className="relative w-screen h-screen bg-black text-white">
      {/* <GithubLink /> */}
      <TextMarquee />
      <NPhaseScroller
        phases={[
          {
            id: "one",
            content: ({ scrollNext }) => <PhaseOne scrollNext={scrollNext} />,
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
