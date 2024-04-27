import { arduino, asm, aws, c, cpp, css, docker, express, firebase, go, javascript, kafka, linux, mongodb, nextjs, nginx, nodejs, python, react, selenium, tailwindcss, typescript } from "../public/assets";

const navLinks = [

];

const otherData = {
  aboutme: "I am a 2nd year Computer Science student who loves building projects and have fun with existing web technologies! My core interests lie in understanding databases, load balancers, and also how different systems are built, and how one can build a cost-effective and performant system which meets the requirements. I also love solving problems on Leetcode. Yup.....you read it right I love Leetcode! I also regularly participate in short contests of algorithms. I got a second place in Alcoding Practice Placement Test series hosted by my university and I am top 4% on Leetcode!"
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
    "title": "Shunya's Arithemania 3.0",
    "description": "Hackathon website built for the club Shunya!",
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
    "title": "Build My Idea",
    "description": "Single Page Built for the client using modern technologies",
    "technologies": [
      [
        "React",
        "primary"
      ],
      [
        "Tailwind CSS",
        "secondary"
      ],
      [
        "DaisyUI",
        "success"
      ]
    ],
    "siteLink": "https://buildmyidea.vercel.app/",
    "siteLinkDesc": "buildmyidea.vercel.app/",
    "githubLink": "https://github.com/Rahul-Baradol/service-build-my-idea",
    "personal": false
  },
  {
    "title": "Shunya's Code of Honour",
    "description": "Hackathon website built for the club Shunya in collaboration with a senior!",
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
    "title": "Decise - Remote Code Executor",
    "description": "A microservice based online judge, which evaluates the code in different languages. (Prototype Version)",
    "technologies": [
      [
        "NextJS",
        "primary"
      ],
      [
        "GraphQL",
        "primary"
      ],
      [
        "Kafka",
        "secondary"
      ]
    ], 
    "siteLink": "",
    "siteLinkDesc": "",
    "githubLink": "https://github.com/Rahul-Baradol/remote-code-executor",
    "personal": true
  },
  {
    "title": "Flow Puzzle Solver",
    "description": "You must have played the game Flow Free on Mobile! Well this app solves the puzzles from the game Flow Free!",
    "technologies": [
      [
        "React",
        "primary"
      ],
      [
        "Bootstrap",
        "secondary"
      ]
    ],
    "siteLink": "https://flowpuzzlesolver.vercel.app/",
    "siteLinkDesc": "flowpuzzlesolver.vercel.app",
    "githubLink": "https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React",
    "personal": true
  },
  {
    "title": "File Compressor/Decompressor",
    "description": "A simple program which uses huffman tree to compress and decompress the file. File size is reduced to 50% of the size",
    "technologies": [
      [
        "C++",
        "primary"
      ],
      [
        "Huffman Tree",
        "primary"
      ],
      [
        "Algorithms",
        "primary"
      ]
    ],
    "siteLink": "",
    "siteLinkDesc": "",
    "githubLink": "https://github.com/Rahul-Baradol/Encoders-And-Encryption-Algorithms",
    "personal": true
  },
  {
    "title": "MQTT Broker",
    "description": "A MQTT broker and client, built in GO simulating Publisher/Subscriber Model",
    "technologies": [
      [
        "Go",
        "primary"
      ],
    ],
    "siteLink": "",
    "siteLinkDesc": "",
    "githubLink": "https://github.com/Rahul-Baradol/MQTT-Broker",
    "personal": false
  }
]

const experience = [
  {
    "id": "1",
    "title": "Software Development Intern",
    "company": "CognitiveLab",
    "date": "January 2024 - February 2024",
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
  }
]

export {
  otherData,
  experience,
  projects,
  servicesOffered,
  navLinks,
  skillsDesc,
  techIcons,
  devQuotes
};