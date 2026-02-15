// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import reduxLogo from './assets/tech_logo/redux.png';
import nextjsLogo from './assets/tech_logo/nextjs.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import materialuiLogo from './assets/tech_logo/materialui.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import expressjsLogo from './assets/tech_logo/express.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import firebaseLogo from './assets/tech_logo/firebase.png';
import cLogo from './assets/tech_logo/c.png';
import javaLogo from './assets/tech_logo/java.png';
import pythonLogo from './assets/tech_logo/python.png';
import typescriptLogo from './assets/tech_logo/typescript.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';
import mcLogo from './assets/tech_logo/mc.png';
import figmaLogo from './assets/tech_logo/figma.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import sqlLogo from './assets/tech_logo/sqlLogo.png';

// Experience Section Logo's
import Inlighn from './assets/company_logo/Inlighn.png';
import Zidio from './assets/company_logo/Zidio.png';
import Ybi from './assets/company_logo/ybi_foundation.png';

// Education Section Logo's
import upboard from './assets/education_logo/up_board.png';
import allen from './assets/education_logo/allen.png';

// Project Section Logo's
import trendify from './assets/work_logo/trendify.png';
import taskflow from './assets/work_logo/taskflow.png';
import movierecLogo from './assets/work_logo/movie_rec.png';
import leetcode from './assets/work_logo/leetcode.png';
import pasteApp from './assets/work_logo/pasteapp.png';
import waste from './assets/work_logo/waste.png';
import imagesearchLogo from './assets/work_logo/image_search.png';
import removebgLogo from './assets/work_logo/remove_bg.png';


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
      { name: 'Material UI', logo: materialuiLogo },
      { name: 'Bootstrap', logo: bootstrapLogo },
      { name: 'Next JS', logo: nextjsLogo },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'Firebase', logo: firebaseLogo },
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
      { name: 'Netlify', logo: netlifyLogo },
      { name: 'Figma', logo: figmaLogo },
    ],
  },
];

  export const experiences = [
    {
      id: 0,
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
        "Redux",
        "Next Js",
        "Express JS",
        "Git",
        "GitHub",
        "Rest API"
      ],
    },
    {
      id: 1,
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
    {
      id: 2,
      img: Ybi,
      role: "Python Intern",
      company: "YBI Foundation",
      date: "August 2023 - September 2023",
      desc: "Assisted in developing Python-based applications and automation scripts, contributing to efficient software solutions. Worked on data analysis, algorithm optimization, and debugging tasks to enhance project performance.",
      skills: [
        "Python",
        "Pandas",
        "NumPy",
        "SQL",
        "Git",
        "GitHub",
      ],
    },
  ];
  
  export const education = [
    {
      id: 0,
      img: allen,
      school: "Allenhouse Institute Of Technology, Kanpur",
      date: "Sept 2022 - Present",
      grade: "8.25 CGPA",
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
      tags: ["Express JS", "Tailwind CSS", "JavaScript", "React JS", "REST API","Mongo DB", "Git", "GitHub","Vercel","Cloudinary","Framer Motion","Axios","Stripe", "MongoDB Atlas"],
      github: "https://github.com/Faiz123760/Trendify",
      webapp: "https://trendify-frontend-ten.vercel.app/",
    },
    {
      id: 1,
      title: "Task Manager App - Taskflow",
      description:
        "Taskflow is a full-stack task management web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application enables users to create, update, delete, and manage tasks efficiently with a clean and responsive user interface. It supports user authentication and authorization to ensure secure access to individual task data. Taskflow helps users organize their daily activities, track task status, and improve productivity through a structured and user-friendly workflow. The project demonstrates practical implementation of RESTful APIs, state management, and secure backend integration.",
      image: taskflow,
      tags: ["React JS", "Node JS", "MongoDB", "Express JS", "Tailwind CSS", "JavaScript","REST API","Git","GitHub","vercel","Cloudinary","Axios","Framer Motion","JWT Authentication","MongoDB Atlas"],
      github: "https://github.com/Faiz123760/Task-Manager-",
      webapp: "https://task-manager-frontend-nine-navy.vercel.app/login",
    },
    {
      id: 2,
      title: "Movie Recommendation App",
      description:
        "A React-based web application that provides movie recommendations based on different criteria, such as genres, user preferences, and popular trends. The intuitive design and smooth experience make it a go-to app for movie enthusiasts.",
      image: movierecLogo,
      tags: ["React JS", "REST API", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/Faiz123760/Movie-Recommendation-System",
      webapp: "https://movie-recommendation-system-coral-nine.vercel.app/",
    },
    {
      id: 3,
      title: "Leetcode Stats Dashboard",
      description:
        "The LeetCode Stats Dashboard is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that provides a visual and analytical overview of a user’s LeetCode problem-solving performance. The application fetches and processes LeetCode statistics to display metrics such as total problems solved, difficulty-wise distribution, submission trends, and progress insights through interactive charts and dashboards. It helps users track consistency, analyze strengths and weaknesses, and monitor improvement over time. This project demonstrates skills in API integration, data aggregation, backend processing, and frontend data visualization.",
      image: leetcode,
      tags: ["React JS", "Node JS", "Express JS", "Validation", "JavaScript", "Git", "GitHub","ApexCharts","Chart.js"],
      github: "https://github.com/Faiz123760/Leetcode-Stats-Dashboard",
      webapp: "https://leetcode-stats-dashboard.vercel.app/",
    },
    {
      id: 4,
      title: "Paste App",
      description:
        "The Paste App is a full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that allows users to create, store, and share text or code snippets securely. Users can generate unique shareable links for pastes, making it easy to collaborate or reference content. The application supports features such as syntax-friendly text input, paste management, and secure data handling. This project demonstrates strong understanding of RESTful APIs, database design, and frontend–backend integration in a scalable web application.",
      image: pasteApp,
      tags: ["JavaScript", "Git","Express JS", "Tailwind CSS","Github","React JS","MongoDB","Node JS"],
      github: "https://github.com/Faiz123760/PasteApp",
      webapp: "https://paste-app-gold-kappa.vercel.app/",
    },
    {
      id: 5,
      title: "E-Waste Management App",
      description:
        "The E-Waste Management Web Application is a responsive front-end project developed using HTML, CSS, JavaScript, and Bootstrap to promote efficient and sustainable waste disposal practices. The application provides users with information on waste segregation, recycling methods, and responsible waste management guidelines. With an intuitive and mobile-friendly interface, the app helps users understand different waste categories and encourages eco-friendly behavior. This project demonstrates strong frontend development skills, responsive UI design, and effective use of JavaScript for interactive features.",
      image: waste,
      tags: ["HTML","CSS","Javascript","Bootstrap"],
      github: "https://github.com/Faiz123760/E-Waste-Management",
      webapp: "https://e-waste-management-hazel.vercel.app/",
    },
    
    {
      id: 6,
      title: "Image Search App",
      description:
        "A React.js-based image search application that allows users to search and download high-quality images from the web. Built using external APIs to ensure a vast library of results for various queries.",
      image: imagesearchLogo,
      tags: ["React JS", "REST API", "Search Feature", "CSS", "Javascript"],
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
