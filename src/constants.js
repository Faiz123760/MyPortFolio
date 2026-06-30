// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.webp';
import cssLogo from './assets/tech_logo/css.webp';
import javascriptLogo from './assets/tech_logo/javascript.webp';
import reactjsLogo from './assets/tech_logo/reactjs.webp';
import reduxLogo from './assets/tech_logo/redux.webp';
import nextjsLogo from './assets/tech_logo/nextjs.webp';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.webp';
import bootstrapLogo from './assets/tech_logo/bootstrap.webp';
import nodejsLogo from './assets/tech_logo/nodejs.webp';
import expressjsLogo from './assets/tech_logo/express.webp';
import mysqlLogo from './assets/tech_logo/mysql.webp';
import mongodbLogo from './assets/tech_logo/mongodb.webp';
import cLogo from './assets/tech_logo/c.webp';
import javaLogo from './assets/tech_logo/java.webp';
import pythonLogo from './assets/tech_logo/python.webp';
import typescriptLogo from './assets/tech_logo/typescript.webp';
import gitLogo from './assets/tech_logo/git.webp';
import githubLogo from './assets/tech_logo/github.webp';
import vscodeLogo from './assets/tech_logo/vscode.webp';
import postmanLogo from './assets/tech_logo/postman.webp';
import mcLogo from './assets/tech_logo/mc.webp';
import vercelLogo from './assets/tech_logo/vercel.webp';
import postgreLogo from './assets/tech_logo/postgre.webp';
import sqlLogo from './assets/tech_logo/sqlLogo.webp';

// Experience Section Logo's
import Inlighn from './assets/company_logo/Inlighn.webp';
import Zidio from './assets/company_logo/Zidio.webp';
import androcoders from './assets/company_logo/androcoders.webp';

// Education Section Logo's
import upboard from './assets/education_logo/up_board.webp';
import allen from './assets/education_logo/allen.webp';

// Project Section Logo's
import trendify from './assets/work_logo/trendify.webp';
import socialApp from './assets/work_logo/social-media.webp';
import prescripto from './assets/work_logo/prescripto.webp';
import pasteApp from './assets/work_logo/pasteapp.webp';
import imagesearchLogo from './assets/work_logo/image_search.webp';
import removebgLogo from './assets/work_logo/remove_bg.webp';


export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      { name: 'Redux', logo: reduxLogo },
      { name: 'Next JS', logo: nextjsLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
      { name: 'Bootstrap', logo: bootstrapLogo },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'PostgreSQL', logo: postgreLogo },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'C', logo: cLogo },
      { name: 'Java', logo: javaLogo },
      { name: 'Python', logo: pythonLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'TypeScript', logo: typescriptLogo },
      { name: 'SQL', logo: sqlLogo },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'GitHub', logo: githubLogo },
      { name: 'VS Code', logo: vscodeLogo },
      { name: 'Postman', logo: postmanLogo },
      { name: 'Compass', logo: mcLogo },
      { name: 'Vercel', logo: vercelLogo },
    ],
  },
];

export const experiences = [
  {
    id: 0,
    img: androcoders,
    role: "Software Developer",
    company: "AndroCoders",
    date: "March 2026 - Present",
    desc: "Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize application performance in an agile environment.",
    skills: [
      "JavaScript",
      "React JS",
      "TypeScript",
      "Node JS",
      "Tailwind CSS",
      "MongoDB",
      "Next Js",
      "Express JS",
      "Git",
      "GitHub",
      "Rest API",
    ],
  },
  {
    id: 1,
    img: Inlighn,
    role: "Fullstack Development Intern",
    company: "InlighnX Global Pvt. Ltd.",
    date: "June 2025 - July 2025",
    desc: "Developed dynamic and scalable web applications using the MERN stack, handling both frontend and backend development. Collaborated with cross-functional teams to build responsive UI, implement RESTful APIs, and optimize application performance in an agile environment.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React JS",
      "TypeScript",
      "Node JS",
      "Tailwind CSS",
      "MongoDB",
      "Express JS",
      "Git",
      "GitHub",
      "Rest API"
    ],
  },
  {
    id: 2,
    img: Zidio,
    role: "Frontend Intern",
    company: "Zidio Development",
    date: "March 2025 - May 2025",
    desc: "Thrilled to be working as a Frontend Intern at Zidio Development, where I’m actively contributing to real-world projects and enhancing my skills in front-end. This internship has been a valuable opportunity to bridge academic knowledge with hands-on industry experience.",
    skills: [
      "ReactJS",
      "Redux",
      "JavaScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "MongoDB",
    ],
  },

];

export const education = [
  {
    id: 0,
    img: allen,
    school: "Allenhouse Institute Of Technology, Kanpur",
    date: "Sept 2022 - June 2026",
    grade: "8.44 CGPA",
    desc: "I am pursuing a Bachelor of Technology (B.Tech) in Artificial Intelligence and Machine Learning from Allenhouse Institute of Technology, Kanpur Nagar. My studies have built a strong foundation in core computer science subjects including Data Structures and Algorithms, Operating Systems, DBMS, Computer Networks, and Software Engineering. Alongside academics, I have worked on practical web and full-stack development projects, strengthening my problem-solving skills and understanding of modern software development.",
    degree: "Bachelor of Technology - B.Tech CS(AIML)",
  },
  {
    id: 1,
    img: upboard,
    school: "S.F. Inter College, Kanpur Nagar",
    date: "May 2021 - May 2022",
    grade: "79%",
    desc: "I completed my Intermediate (12th Grade) education from S.F. Inter College, Kanpur Nagar, under the UP Board. I studied Physics, Chemistry, and Mathematics (PCM), which helped me develop strong analytical, problem-solving, and logical reasoning skills. This academic foundation played a key role in building my interest in computer science and technology and prepared me for higher studies in technical domains.",
    degree: "UP Board - Intermediate (12th Grade)",
  },
  {
    id: 2,
    img: upboard,
    school: "S.F. Inter College, Kanpur Nagar",
    date: "Apr 2019 - March 2020",
    grade: "79.83%",
    desc: "I completed my High School (10th Grade) education from S.F. Inter College, Kanpur Nagar, under the UP Board. During this period, I gained a solid foundation in core subjects such as Mathematics, Science, and English. My schooling helped strengthen my conceptual understanding, discipline, and learning habits, which became essential for my academic and professional growth.",
    degree: "UP Board - High School (10th Grade)",
  },

];

export const projects = [
  {
    id: 0,
    title: "E-Commerce Website - Trendify",
    description:
      "Trendify is a modern, full-stack, fully responsive e-commerce platform designed to replicate a professional online shopping experience. Built using the MERN stack with powerful admin controls and dual payment integration, Trendify offers everything you'd expect from a commercial-grade application. The frontend is crafted with React.js and Tailwind CSS, ensuring a sleek and intuitive user interface. The backend is powered by Node.js and Express.js, providing robust API endpoints for seamless data management. MongoDB serves as the database, efficiently handling product information, user data, and order details. With features like user authentication, product search, shopping cart functionality, and secure payment processing through Stripe and PayPal, Trendify delivers a comprehensive e-commerce solution that meets the needs of both customers and administrators.",
    image: trendify,
    tags: ["Express JS", "Tailwind CSS", "JavaScript", "React JS", "REST API", "Mongo DB", "Git", "GitHub", "Vercel", "Cloudinary", "Framer Motion", "Axios", "Stripe", "MongoDB Atlas"],
    github: "https://github.com/Faiz123760/Trendify",
    webapp: "https://trendify-frontend-ten.vercel.app/",
  },
  {
    id: 1,
    title: "Social Media App",
    description:
      "A modern social media platform built using the MERN stack, enabling users to connect, share posts, and interact in real time with a seamless user experience.Developed a full-stack social networking application with secure authentication, dynamic feeds, real-time messaging, and responsive UI using MongoDB, Express.js, React, and Node.js.",
    image: socialApp,
    tags: ["React JS", "Node JS", "MongoDB", "Express JS", "Tailwind CSS", "JavaScript", "REST API", "Git", "GitHub", "vercel", "Cloudinary", "Axios", "JWT Authentication", "MongoDB Atlas"],
    github: "https://github.com/Faiz123760/Social-App.git",
    webapp: "https://social-app-frontend-puce.vercel.app/login",
  },
  {
    id: 2,
    title: "Prescripto - Online Doctor Consultation App",
    description:
      "A modern online doctor appointment booking platform built with the MERN Stack that allows users to find doctors, book appointments, and manage schedules seamlessly.It features secure authentication, real-time booking management, admin controls, and a responsive user-friendly interface for patients and doctors.",
    image: prescripto,
    tags: ["React JS", "REST API", "HTML", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/Faiz123760/Prescripto-frontend",
    webapp: "https://prescripto-frontend-black.vercel.app",
  },
  // {
  //   id: 3,
  //   title: "Leetcode Stats Dashboard",
  //   description:
  //     "The LeetCode Stats Dashboard is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that provides a visual and analytical overview of a user’s LeetCode problem-solving performance. The application fetches and processes LeetCode statistics to display metrics such as total problems solved, difficulty-wise distribution, submission trends, and progress insights through interactive charts and dashboards. It helps users track consistency, analyze strengths and weaknesses, and monitor improvement over time. This project demonstrates skills in API integration, data aggregation, backend processing, and frontend data visualization.",
  //   image: leetcode,
  //   tags: ["React JS", "Node JS", "Validation", "JavaScript", "Git", "GitHub", "ApexCharts", "Chart.js", "Taulwind CSS"],
  //   github: "https://github.com/Faiz123760/Leetcode-Stats-Dashboard",
  //   webapp: "https://leetcode-stats-dashboard.vercel.app/",
  // },
  {
    id: 4,
    title: "Paste App",
    description:
      "The Paste App is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that allows users to create, store, and share text or code snippets securely. Users can generate unique shareable links for pastes, making it easy to collaborate or reference content. The application supports features such as syntax-friendly text input, paste management, and secure data handling. This project demonstrates strong understanding of RESTful APIs, database design, and frontend–backend integration in a scalable web application.",
    image: pasteApp,
    tags: ["JavaScript", "Git", "Tailwind CSS", "Github", "React JS"],
    github: "https://github.com/Faiz123760/PasteApp",
    webapp: "https://paste-app-gold-kappa.vercel.app/",
  },
  // {
  //   id: 5,
  //   title: "E-Waste Management App",
  //   description:
  //     "The E-Waste Management Web Application is a responsive front-end project developed using HTML, CSS, JavaScript, and Bootstrap to promote efficient and sustainable waste disposal practices. The application provides users with information on waste segregation, recycling methods, and responsible waste management guidelines. With an intuitive and mobile-friendly interface, the app helps users understand different waste categories and encourages eco-friendly behavior. This project demonstrates strong frontend development skills, responsive UI design, and effective use of JavaScript for interactive features.",
  //   image: waste,
  //   tags: ["HTML", "CSS", "Javascript", "Bootstrap"],
  //   github: "https://github.com/Faiz123760/E-Waste-Management",
  //   webapp: "https://e-waste-management-hazel.vercel.app/",
  // },

  {
    id: 6,
    title: "Image Search App",
    description:
      "A React.js-based image search application that allows users to search and download high-quality images from the web. Built using external APIs to ensure a vast library of results for various queries.",
    image: imagesearchLogo,
    tags: ["REST API", "HTML", "Search Engine", "CSS", "Javascript"],
    github: "https://github.com/Faiz123760/Image-Search-app",
    webapp: "https://e-waste-management-uan3.vercel.app/",
  },
  {
    id: 7,
    title: "Image Background Remover",
    description:
      "An efficient background removal app built with React.js and API integration. Users can upload any image, remove the background, and download the transparent version for further use.",
    image: removebgLogo,
    tags: ["Image Processing", "HTML", "CSS", "Javascript"],
    github: "https://github.com/Faiz123760/Image-Background-Remover",
    webapp: "https://image-background-remover-three.vercel.app/",
  },
];  
