import { arduino, asm, aws, c, cpp, css, docker, express, firebase, go, javascript, kafka, linux, mongodb, nextjs, nginx, nodejs, python, react, selenium, tailwindcss, typescript } from "../public/assets";

const navLinks = [
  {
    id: "blog",
    title: "explore diary!",
  }
];

const otherData = {
  aboutme: "Hello there! I am a third year Computer Science student. Curious about software engineering; but when it comes to nichy things...you will find me messing with database engines, trying to build load balancers, and trying to learn more about systems in general. Also curious about algorithms, because of which I participate in algorithmic contests quite often, to keep myself sharp. If not any of this...then you will end up seeing me banging my keyboard on monkeytype!",
  tagline: "Building systems that scale, one line of code at a time ⚡"
}

const devQuotes = [
  {
    "quote": "Programming is not about typing, it's about thinking.",
    "author": "Rich Hickey"
  },
  {
    "quote": "Don't write better error messages, write code that doesn't need them.",
    "author": "Jason C. McDonald"
  },
  {
    "quote": "First, solve the problem. Then, write the code.",
    "author": "John Johnson"
  },
  {
    "quote": "Code is like humor. When you have to explain it, it's bad.",
    "author": "Cory House"
  },
  {
    "quote": "The function of good software is to make the complex appear to be simple.",
    "author": "Grady Booch"
  },
  {
    "quote": "Software is a great combination between artistry and engineering.",
    "author": "Bill Gates"
  },
  {
    "quote": "There are only two hard things in computer science: cache invalidation and naming things.",
    "author": "Phil Karlton"
  },
  {
    "quote": "Programming isn't about what you know; it's about what you can figure out.",
    "author": "Chris Pine"
  },
  {
    "quote": "Problem solving is about understanding my mind.",
    "author": "ME"
  }
]

const skillsDesc = [
  "Computer Science Student",
  "Full Stack Engineer",
  "Cloud Engineer",
  "Distributed Systems",
  "Algorithms",
]

const techIcons = [
  {
    "name": "Arduino",
    "src": arduino,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "C",
    "src": c,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "Express",
    "src": express,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "AWS",
    "src": aws,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "CSS",
    "src": css,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "Docker",
    "src": docker,
    "width": "60px",
    "height": "60px",
  },

  {
    "name": "Firebase",
    "src": firebase,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "C++",
    "src": cpp,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "Go",
    "src": go,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "JavaScript",
    "src": javascript,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "MongoDB",
    "src": mongodb,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "NextJS",
    "src": nextjs,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "NGINX",
    "src": nginx,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "NodeJS",
    "src": nodejs,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "Python",
    "src": python,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "React",
    "src": react,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "Linux",
    "src": linux,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "Kafka",
    "src": kafka,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "Selenium",
    "src": selenium,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "Tailwind CSS",
    "src": tailwindcss,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "TypeScript",
    "src": typescript,
    "width": "60px",
    "height": "60px",
  },

]

const servicesOffered = [
  {
    "title": "Kodikon 4.0",
    "description": "Led a team for the development of national hackathon website - Kodikon 4.0!",
    "technologies": [
      [
        "NextJS",
        "primary"
      ],
      [
        "Tailwind CSS",
        "secondary"
      ],
      [
        "Firebase",
        "success"
      ]
    ],
    "siteLink": "https://www.embrionepes.com/kodikon-4",
    "siteLinkDesc": "embrionepes.com/kodikon-4",
    "githubLink": "https://github.com/Rahul-Baradol/embrione-pes",
    "personal": false
  },
  {
    "title": "Shunya's Arithemania 3.0",
    "description": "Hackathon website built for a college club named Shunya!",
    "technologies": [
      [
        "NextJS",
        "primary"
      ],
      [
        "Tailwind CSS",
        "secondary"
      ],
      [
        "Firebase",
        "success"
      ]
    ],
    "siteLink": "https://arithemania3.vercel.app/",
    "siteLinkDesc": "arithemania3.vercel.app",
    "githubLink": "https://github.com/Rahul-Baradol/arithemania-3.0",
    "personal": false
  },
  {
    "title": "Shunya's Code of Honour",
    "description": "Hackathon website built for a college club named Shunya, in collaboration with a senior!",
    "technologies": [
      [
        "NextJS",
        "primary"
      ],
      [
        "Tailwind CSS",
        "secondary"
      ],
      [
        "Firebase",
        "success"
      ]
    ],
    "siteLink": "https://codeofhonour.vercel.app/",
    "siteLinkDesc": "codeofhonour.vercel.app",
    "githubLink": "https://github.com/Rahul-Baradol/Shunya-Code-Of-Honor",
    "personal": false
  },
]

const projects = [
  {
    "title": "Hogyoku",
    "description": "Journey to understanding operating systems, by building one!",
    "technologies": [
      [
        "C",
        "primary"
      ],
      [
        "Assembly",
        "secondary"
      ]
    ],
    "siteLink": "/blog/segmentation_for_hogyoku",
    "siteLinkDesc": "Read blog!",
    "githubLink": "https://github.com/Rahul-Baradol/hogyoku",
    "tabTarget": ""
  },
  {
    "title": "resonance",
    "description": "Saving my songs for life...",
    "technologies": [
      [
        "Java",
        "primary"
      ],
      [
        "Spring Boot",
        "secondary"
      ]
    ],
    "siteLink": "https://resonating.vercel.app",
    "siteLinkDesc": "resonating.vercel.app",
    "githubLink": "https://github.com/Rahul-Baradol/resonance",
    "tabTarget": "_blank"
  },
  {
    "title": "Kido",
    "description": "Minimalistic compiler built from scratch!",
    "technologies": [
      [
        "C++",
        "primary"
      ]
    ],
    "siteLink": "/blog/kido", 
    "siteLinkDesc": "Read blog!",
    "githubLink": "https://github.com/Rahul-Baradol/kido",
    "tabTarget": ""
  },
  {
    "title": "leones-arc",
    "description": "Experimenting new GraalVM for native image compilation, along with writing a load balancer 🚀",
    "technologies": [
      [
        "Java",
        "primary"
      ],
      [
        "GraalVM",
        "secondary"
      ]
    ], 
    "siteLink": "",
    "siteLinkDesc": "",
    "githubLink": "https://github.com/Rahul-Baradol/leones-arc",
    "tabTarget": "_blank"
  },
]

const experience = [
  {
    "id": 1,
    "title": "Full-stack Developer Intern",
    "company": "CognitiveLab",
    "date": "Apr 2024 - May 2024",
    "description": `Built a ChatUI platform end-to-end. Frontend Web Application is built using NextJS, TailwindCSS, ShadCN and NextUI. And backend server is built using FastAPI. The application connects to a vector database, which could be queried to answer medical science questions.`,
    "technologies": [
      ["NextJS", "primary"],
      ["FastAPI", "primary"]
    ]
  },
  {
    "id": 2,
    "title": "Software Development Intern",
    "company": "CognitiveLab",
    "date": "Jan 2024 - Feb 2024",
    "description": `Implemented Authentication System using Auth.js by using
                    HuggingFaceChatUI as the template, and also wrote a bunch of Web Scrapers
                    using Selenium and Beautiful Soup to gather images in an attempt to train a
                    vision model`,
    "technologies": [
      ["Python", "primary"],
      ["SvelteKit", "primary"],
      ["Selenium", "primary"],
      ["Azure", "primary"],
    ],
    "certificate": "/assets/Certificates/CognitiveLab.png"
  },
]

const openSourceOrganizations = [
  {
    "id": 1,
    "name": "NextJS",
    "role": "Contributor",
    "period": "2024 - Present",
    "description": "Contributing to the NextJS framework by fixing bugs, improving documentation, and adding new features. Focused on performance optimizations and developer experience improvements.",
    "impact": "🚀 5+ merged PRs improving build performance by 15%\n📚 Enhanced documentation for API routes\n🐛 Fixed critical rendering issues affecting 10k+ developers",
    "technologies": [
      ["JavaScript", "primary"],
      ["TypeScript", "secondary"],
      ["React", "success"]
    ],
    "link": "https://github.com/vercel/next.js"
  },
  {
    "id": 2,
    "name": "Docker",
    "role": "Community Contributor", 
    "period": "2023 - Present",
    "description": "Active contributor to Docker's open source projects, focusing on containerization improvements and community support.",
    "impact": "🔧 Contributed to Docker CLI improvements\n💡 Created educational content for containerization best practices\n🌟 Helped 500+ developers in community forums",
    "technologies": [
      ["Go", "primary"],
      ["Docker", "primary"],
      ["Linux", "secondary"]
    ],
    "link": "https://github.com/docker"
  },
  {
    "id": 3,
    "name": "Apache Kafka",
    "role": "Documentation Contributor",
    "period": "2023 - 2024", 
    "description": "Contributed to improving Apache Kafka's documentation and created guides for stream processing patterns.",
    "impact": "📖 Improved getting started guides reducing onboarding time by 30%\n🔍 Created comprehensive troubleshooting documentation\n👥 Mentored 20+ new contributors",
    "technologies": [
      ["Java", "primary"],
      ["Scala", "secondary"],
      ["Kafka", "primary"]
    ],
    "link": "https://github.com/apache/kafka"
  }
]

const blogContent = [
  {
    "id": "segmentation_for_hogyoku",
    "title": "Hogyoku",
    "description": "understanding segmentation in operating systems!",
    "contentPath": "/blogContent/segmentation_for_hogyoku.md",
    "publishDate": "30th May 2025"
  },
  { 
    "id": "kido",
    "title": "Kido",
    "description": "story behind building a minimalistic compiler from scratch!",
    "contentPath": "/blogContent/kido.md",
    "publishDate": "27th May 2025",
  }
]

const blogNotFound = {
  "title": "404"
}

export {
  otherData,
  experience,
  openSourceOrganizations,
  projects,
  servicesOffered,
  navLinks,
  skillsDesc,
  techIcons,
  devQuotes,
  blogContent,
  blogNotFound
};
