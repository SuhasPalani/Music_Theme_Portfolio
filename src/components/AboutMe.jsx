import React from "react";
import { Database, Server, Code} from "lucide-react";

const AboutMe = () => {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
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

          <div className="md:w-1/2">
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

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                  <Code size={20} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">
                    PROGRAMMING LANGUAGES
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Python | JAVA | C/C++ | Shell-Scripting | HTML | CSS |
                    JavaScript
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                  <Code size={20} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">FRAMEWORKS</h4>
                  <p className="text-gray-400 text-sm">
                    Django | Flask | React | React Native | Node.js | Pandas |
                    NumPy
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                  <Database size={20} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">
                    DATABASES AND TOOLS
                  </h4>
                  <p className="text-gray-400 text-sm">
                    PostgreSQL | MongoDB | SQL | Snowflake | DBT Labs | Redis |
                    UiPath | Postman
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-900/50 flex items-center justify-center mr-3">
                  <Server size={20} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-white font-medium">
                    CLOUD AND DEVOPS TOOLS
                  </h4>
                  <p className="text-gray-400 text-sm">
                    AWS | Docker | Kubernetes | Jenkins | Ansible | GCP | Unix |
                    Git | Kafka | Key Cloak
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/in/suhaspalani/"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/SuhasPalani"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
