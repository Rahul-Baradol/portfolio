import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-[90vh] bg-transparent text-foreground flex flex-col items-center justify-center overflow-hidden">
      <h1 className="animate-fade-up text-[80px] md:text-[120px] font-bold tracking-tight">
        404
      </h1>

      <p className="animate-fade-up [animation-delay:0.1s] text-foreground/70 text-lg md:text-xl">
        <blockquote className="italic text-sm">
            Not all those who wander are lost.
        </blockquote>
      </p>

      <div className="mt-8 z-10">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl border border-border bg-foreground/5 hover:bg-foreground/10 hover:scale-[1.05] active:scale-[0.97] transition-all inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
