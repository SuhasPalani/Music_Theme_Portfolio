import React from "react";
import { Database, Server, Code, Terminal, Cloud, Globe } from "lucide-react";

const AboutMe = () => {
  const skillCategories = [
    {
      title: "PROGRAMMING LANGUAGES",
      icon: <Terminal size={22} className="text-purple-400" />,
      skills: [
        "Python",
        "JAVA",
        "C/C++",
        "Shell-Scripting",
        "HTML",
        "CSS",
        "JavaScript",
      ],
      gradient: "from-indigo-500 to-purple-700",
    },
    {
      title: "FRAMEWORKS",
      icon: <Code size={22} className="text-purple-400" />,
      skills: [
        "Django",
        "Flask",
        "React",
        "React Native",
        "Node.js",
        "Pandas",
        "NumPy",
      ],
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "DATABASES AND TOOLS",
      icon: <Database size={22} className="text-purple-400" />,
      skills: [
        "PostgreSQL",
        "MongoDB",
        "SQL",
        "Snowflake",
        "DBT Labs",
        "Redis",
        "UiPath",
        "Postman",
      ],
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "CLOUD AND DEVOPS TOOLS",
      icon: <Cloud size={22} className="text-purple-400" />,
      skills: [
        "AWS",
        "Docker",
        "Kubernetes",
        "Jenkins",
        "Ansible",
        "GCP",
        "Unix",
        "Git",
        "Kafka",
        "Key Cloak",
      ],
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-white">
              <span className="inline-block w-8 h-1 bg-purple-600 mr-3"></span>
              About The Artist
            </h2>

            <div className="mb-8">
              <div className="record-player relative w-full aspect-square max-w-md mx-auto rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-900 animate-spin-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-black flex items-center justify-center">
                    <div className="w-1/2 h-1/2 rounded-full bg-gray-800 flex items-center justify-center">
                      <div className="w-1/4 h-1/4 rounded-full bg-purple-600"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-1/2 right-1/4 w-24 h-2 bg-gray-700 origin-left rotate-45"></div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center mr-4">
                <span className="text-white font-bold">SP</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Suhas Palani</h3>
                <p className="text-gray-400">
                  Computer Science | Illinois Institute of Technology
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">
              A passionate software engineer with expertise in full-stack
              development and a knack for creating innovative solutions.
              Currently pursuing a Master's in Computer Science at Illinois
              Institute of Technology, with a focus on building scalable and
              efficient applications.
            </p>

            <div className="flex space-x-4 mb-6">
              <a
                href="https://linkedin.com/in/suhaspalani/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/SuhasPalani"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>

            {/* Additional Content to Fill Space */}
            <div className="mt-auto">
              <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-purple-500">
                <h4 className="text-white text-lg font-medium mb-2 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                  Current Focus
                </h4>
                <p className="text-gray-300">
                  Exploring cutting-edge cloud architecture, delving into
                  AI-powered web applications, and strengthening my backend
                  development expertise to build more scalable and efficient
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
          <span className="inline-block w-8 h-1 bg-purple-600 mr-3"></span>
          Skills & Expertise
          <Globe size={24} className="ml-3 text-purple-500" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden transform transition-all hover:scale-[1.02] hover:shadow-lg"
            >
              <div
                className={`h-2 bg-gradient-to-r ${category.gradient}`}
              ></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-200 hover:bg-purple-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
