import type { PR } from "./types/types";

export const sections = [
    {
        company: "Alaiy",
        timeline: "July 2025 - present",
        points: [
            "Saved 95% client bandwidth with caching",
            "Reduced page latency from 8-10s to <1s",
            "Built wallet & credit system ensuring 99.9% transaction reliability",
            "Built blockbuster movie campaigning site - 65k submissions with 8.3k peak users/min",
            "Delivered a scalable Redux + RTK state layer for a complex product page with multi-version fields, cutting orchestration complexity and improving developer productivity",
        ],
    },
    {
        company: "CRED",
        timeline: "July 2024 - June 2025",
        points: [
            "Reduced write IOPS by 87%",
            "Cut CPU usage from 70% → 20%",
            "Restored ingestion pipeline to 99.9% user coverage",
            "Fixed extraction funnel affecting 300k workflows",
        ],
    },
    {
        company: "Cognitive Lab",
        timeline: "April 2024 - May 2024",
        points: [
            "Owned full medical-query chat platform",
            "FastAPI backend with real-time structured responses",
        ],
    },
];

export const SignatureCardDetails = {
    title: "Timesignature",
    description:
        "A realtime music visualiser that reacts to beat signatures and tempo.",
    videoSrc: "/signature.mp4",
    posterSrc: "/signature-poster.jpg",
    redirectUrl: "https://timesignature.in",
}

export const FlowPuzzleCardDetails = {
    title: "Flow Puzzle Solver",
    description:
        "An automated solver for FlowFree puzzles using pathfinding algorithms.",
    videoSrc: "/flow-puzzle-solver.mov",
    posterSrc: "/flow-poster.jpg",
    redirectUrl: "https://flowpuzzlesolver.vercel.app/"
}

export const links = [
    {
        label: "X (Twitter)",
        href: "https://x.com/rahulbaradol",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/rahul-baradol/",
    },
];

export const marqueeTexts = [
    "JavaScript",
    "TypeScript",
    "CSS",
    "TailwindCSS",
    "React",
    "NextJS",
    "FastAPI",
    "Framer",
    "Redux",
    "RTK",
    "Performance",
    "DX"
];

export const FALLBACK_SONG = {
    "songName": "Ninna Kanda",
    "artists": [
        "Joshua Sridhar",
        "Kunal Ganjawala",
        "Ram Narayan"
    ],
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2732c6f3af3a14baab913988592"
};

export const FALLBACK_MERGED_PRS: PR[] = [
    {
        id: 1,
        title: "feat: allowing null/missing defaultValue",
        repo: "openfeature/flagd",
        url: "https://github.com/open-feature/flagd/pull/1659",
        createdAt: "2025-06-29T08:38:44Z",
        state: "closed"
    },
    {
        id: 2,
        title: "feat: making default values optional",
        repo: "open-feature/flagd-schemas",
        url: "https://github.com/open-feature/flagd-schemas/pull/187",
        createdAt: "2025-06-29T08:46:29Z",
        state: "closed"
    },
    {
        id: 3,
        title: "feat: updating context using headers",
        repo: "open-feature/flagd",
        url: "https://github.com/open-feature/flagd/pull/1641",
        createdAt: "2025-06-10T17:38:13Z",
        state: "closed"
    },
]

export const GITHUB_USERNAME = "Rahul-Baradol"

export const DEV_TIPS = [
    {
        tip: "In useEffect, when firing an async event, make sure to cancel it in the cleanup function of useEffect",
        explanation: "When a component unmounts before an async operation finishes, the callback may try to update state on an unmounted component — causing memory leaks or stale updates. Use an AbortController to cancel fetch calls. Always return a cleanup that aborts the in-flight work.",
        codeSnippet: `useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setState(data))
    .catch((err) => {
      if (err.name !== "AbortError") throw err;
    });

  return () => controller.abort();
}, []);`,
    },
    {
        tip: "Avoid using expression && <Component /> for conditional rendering",
        explanation: "When expression is a falsy non-boolean like 0 or \"\", React renders it literally in the DOM — so a lone 0 can appear on screen. A ternary is always explicit about what renders in both branches.",
        codeSnippet: `// ❌ renders "0" in the DOM when count is 0
{count && <List items={items} />}

// ✓ always renders null, never "0"
{count ? <List items={items} /> : null}`,
    },
    {
        tip: "Avoid coupling API and Component logic",
        explanation: "When fetch calls live directly inside a component, they're hard to test, reuse, or swap. Extracting them into a custom hook keeps the component focused on rendering and makes the data layer independently testable.",
        codeSnippet: `// ❌ API logic tangled inside the component
function UserCard({ id }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(\`/api/users/\${id}\`).then(r => r.json()).then(setUser);
  }, [id]);
  return <div>{user?.name}</div>;
}

// ✓ data layer extracted into a custom hook
function useUser(id) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(\`/api/users/\${id}\`).then(r => r.json()).then(setUser);
  }, [id]);
  return user;
}

function UserCard({ id }) {
  const user = useUser(id);
  return <div>{user?.name}</div>;
}`,
    },
    {
        tip: "Consider lazy loading images which are below-the-fold, always",
        explanation: "Eagerly loaded offscreen images compete for bandwidth with content the user can actually see. The loading=\"lazy\" attribute tells the browser to defer them until the user scrolls near — zero JS required.",
        codeSnippet: `// ❌ fires immediately, blocks bandwidth for visible content
<img src="/hero-photo.jpg" alt="hero" />

// ✓ deferred until close to the viewport
<img src="/hero-photo.jpg" alt="hero" loading="lazy" />`,
    },
    {
        tip: "Consider lazy loading components which are below-the-fold, especially when they trigger heavy fetches",
        explanation: "Components with heavy fetches or large JS shouldn't block the initial page load. React.lazy + Suspense defers both the bundle and the network call until the component is actually needed, cutting your initial load time.",
        codeSnippet: `import { lazy, Suspense } from "react";

// ❌ imported eagerly — its fetch fires on page load
import HeavyDashboard from "./HeavyDashboard";

// ✓ code and fetch deferred until it enters the viewport
const HeavyDashboard = lazy(() => import("./HeavyDashboard"));

function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyDashboard />
    </Suspense>
  );
}`,
    },
    {
        tip: "Versioning your build and emitting a manifest.json on every deploy helps the browser detect stale bundles",
        explanation: "Without a build version, browsers may silently serve a cached old bundle after a deploy. Emitting a manifest.json with the current hash lets you detect at runtime that a newer build exists and prompt the user to refresh.",
        codeSnippet: `// vite.config.ts — emit a manifest on every build
export default defineConfig({
  build: {
    manifest: true, // writes .vite/manifest.json
    rollupOptions: {
      output: {
        // content-hashed filenames bust the CDN cache
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
});

// At runtime, compare hashes
const { version } = await fetch("/manifest.json").then(r => r.json());
if (version !== localVersion) showUpdateBanner();`,
    },
    {
        tip: "If a component makes one more API call, think that it would be twice as many API calls received by the server",
        explanation: "A single fetch inside a component is fine in isolation. Render that component in a list of 50 items and you've just fired 50 calls to the server. Before adding a fetch inside a component, consider lifting it to the parent, batching, or using a shared cache like React Query.",
        codeSnippet: `// ❌ each card fires its own fetch — 50 cards = 50 API calls
function UserCard({ id }) {
  const user = useUser(id); // fetch inside
  return <Card>{user.name}</Card>;
}

function UserList({ ids }) {
  return ids.map(id => <UserCard key={id} id={id} />);
}

// ✓ fetch once at the list level, pass data down
function UserList({ ids }) {
  const users = useUsers(ids); // single batched fetch
  return users.map(u => <Card key={u.id}>{u.name}</Card>);
}`,
    },
]

export const stories = [
    {
        title: "How We Cut Store Page Data Transfer by 73%",
        description: "It so happens that we get so involved in shipping features for web apps, that we miss out on the tech debt creeping up.",
        date: "3rd May 2026",
        tags: ["Web Performance"],
        mediumUrl: "https://medium.com/@mail_99211/how-we-cut-store-page-data-transfer-by-73-9733af2dee20"
    },
    {
        title: "Scaling our web-app — managing data better",
        description: "A web app is only simple, until you break the abstraction",
        date: "1st December 2025",
        tags: ["Scalability"],
        mediumUrl: "https://medium.com/@mail_99211/scaling-our-web-app-managing-data-better-1ad980b75a2a"
    }
]