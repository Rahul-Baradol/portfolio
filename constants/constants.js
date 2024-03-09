import { arduino, asm, aws, c, cpp, css, docker, express, firebase, go, javascript, kafka, linux, mongodb, nextjs, nginx, nodejs, python, react, selenium, tailwindcss, typescript } from "../public/assets";

const navLinks = [

];

const otherData = {
  aboutme: "I am a 2nd year Computer Science student who loves building projects and have fun with existing web technologies! I also love solving problems on Leetcode. Yup.....you read it right I love Leetcode!. I also love participating in short contests of algorithms. I got a second place in Alcoding Practice Placement Test series hosted by my university and I am top 4% on Leetcode! I also love to learn how different systems are built, and how one can build a system end-to-end which is cost-effective, performant, and fulfills the demands of the customers. "
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
  }
]

const skillsDesc = [
  "Computer Science Student",
  "Full Stack Engineer",
  "Algorithms",
  "Cloud Engineer",
  "DevOps"
]

const techIcons = [
  {
    "name": "arduino",
    "src": arduino,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "c",
    "src": c,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "express",
    "src": express,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "aws",
    "src": aws,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "css",
    "src": css,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "docker",
    "src": docker,
    "width": "60px",
    "height": "60px",
  },

  {
    "name": "firebase",
    "src": firebase,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "cpp",
    "src": cpp,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "go",
    "src": go,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "javascript",
    "src": javascript,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "mongodb",
    "src": mongodb,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "nextjs",
    "src": nextjs,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "nginx",
    "src": nginx,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "nodejs",
    "src": nodejs,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "python",
    "src": python,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "react",
    "src": react,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "linux",
    "src": linux,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "kafka",
    "src": kafka,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "selenium",
    "src": selenium,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "tailwindcss",
    "src": tailwindcss,
    "width": "60px",
    "height": "60px",
  },
  {
    "name": "typescript",
    "src": typescript,
    "width": "60px",
    "height": "60px",
  },

]

const servicesOffered = [
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
        "Kafka",
        "secondary"
      ]
    ],
    "siteLink": "",
    "siteLinkDesc": "",
    "githubLink": "https://github.com/orgs/rce-remote-code-executor/repositories",
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
    "title": "Mini Projects",
    "description": "Projects made in my school days just for fun. Java is used for the logic part and FXML is used for the UI!",
    "technologies": [
      [
        "Java",
        "primary"
      ]
    ],
    "siteLink": "",
    "siteLinkDesc": "",
    "githubLink": "https://github.com/Rahul-Baradol/High-School-Projects-JavaFX-",
    "personal": true
  }
]

export {
  otherData,
  projects,
  servicesOffered,
  navLinks,
  skillsDesc,
  techIcons,
  devQuotes
};