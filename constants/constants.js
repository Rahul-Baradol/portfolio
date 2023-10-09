import { 
  flowpuzzlesolver, 
  github, 
  nodejs, 
  reactjs,
  leetCodeIcon,
  codeChefIcon
} from '@/assets'
  
  const navLinks = [
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  const workInfo = {
    profile: {
      github: {
        logo: github,
        description: "Dive into the world with me to know more about my work and the technologies that I use!",
        link: "https://github.com/Rahul-Baradol"
      },

      cpProfile: {
        description: "If you have participated in a contest, you would be knowing that feeling of AC. And if you are also like me who enjoys solving those problems late night, grinding for the AC, then you can checkout my profiles where I am very active! ",

        leetcode: {
          logo: leetCodeIcon,
          link: "https://leetcode.com/rahul_baradol/"
        },

        codechef: {
          logo: codeChefIcon,
          link: "https://www.codechef.com/users/rahul227"
        }
      }
    },

    projects: [
      {
        title: "Flow Puzzle Solver",
        description: "You must have played the game Flow Free on Mobile! Well this app solves the puzzles from the game Flow Free!",
        technologies: [
          [reactjs, "React JS"], 
          [nodejs, "Node JS"]
        ],
        
        projectLinks: [
          ["https://flowpuzzlesolver.vercel.app/", flowpuzzlesolver, "F"], 
          ["https://github.com/Rahul-Baradol/Flow-Puzzle-Solver-React", github, "GitHub"]
        ]
      }
    ]
  }
  
  const contactInfo = {
    github: {
      title: "GitHub",
      description: "@Rahul-Baradol",
      link: "https://github.com/Rahul-Baradol"
    },

    linkedIn: {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/rahul-baradol-22723b289/"
    }
  }

  const emailInfo = {
    serviceId: "service_ovdt9sg",
    templateId: "template_epwmkc2",
    publicKey: "Ij2Paklave1Hh2jta",
    toName: "Rahul",
    toEmail: "rahul.baradol.14@gmail.com"
  }

export  {  navLinks,
           workInfo,
           contactInfo,
           emailInfo
        };