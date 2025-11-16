import { motion } from "framer-motion";

export default function PhaseThree({ scrollNext }: { scrollNext: () => void }) {
  const blocks = [
    {
      title: "I Build With Depth",
      text: `I don't chase frameworks. I chase understanding. Rendering engines, operating systems, databases, compilers — I love the foundations. I believe great engineers master the fundamentals,
             and I try to reflect that in everything I build.`,
    },
    {
      title: "Systems Shape Me",
      text: `From writing kernels and bootloaders to crafting high-performance backends and data pipelines,
             I enjoy the kind of engineering where latency matters, correctness matters, internal design matters.`,
    },
    {
      title: "Design Isn't Decoration",
      text: `UI and UX are part of engineering. Clean UI, intuitive interactions, smooth motion — this is how 
             I communicate clarity. My UI Lab is where I experiment, refine, and push what feels natural.`,
    },
    {
      title: "I Build To Solve",
      text: `Whether it's a wallet system handling thousands of transactions, 
             a trading bot reacting in milliseconds, or a distributed store maintaining consistency — 
             I love tight loops, elegant logic, and systems that just… work.`,
    },
    {
      title: "This Is My Craft",
      text: `I'm not optimizing for titles or hype. I'm optimizing for mastery. 
             Craftsmanship. The joy of building things that feel ambitious, precise, and beautifully engineered.`,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 select-none">

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold mb-16 text-center"
      >
        Why I Build
      </motion.h2>

      <div className="max-w-3xl w-full flex flex-col space-y-20">
        {blocks.map((block, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-4"
          >
            <h3 className="text-2xl md:text-3xl font-semibold">
              {block.title}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              {block.text}
            </p>
          </motion.div>
        ))}

        <motion.button
          onClick={scrollNext}
          className="mt-12 px-6 py-3 rounded-md bg-blue-500 text-white"
        >
          Next
        </motion.button>
      </div>
    </div>
  );
}
