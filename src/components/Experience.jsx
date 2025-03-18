import React, { useState } from "react";
import { Calendar, MapPin, Disc } from "lucide-react";

const Experience = () => {
  const [activeExp, setActiveExp] = useState(0);

  const experiences = [
    {
      title: "Freelance Backend Developer",
      company: "Planet Celluloid Pvt Ltd",
      location: "India",
      period: "Dec 2024 - Present",
      description: [
        "Leading backend development with a focus on backend logic implementation and database management using MongoDB, improving system performance by optimizing queries and data storage.",
        "Built an automated system to efficiently load data into MongoDB, reducing manual effort and improving data processing speed.",
        "Designing and refining matchmaking algorithms to connect brands with talents and vice versa, increasing matchmaking efficiency by up to 20%.",
        "Leveraging Python and OpenAI technologies to explore and integrate AI-driven solutions, contributing to the enhancement of platform capabilities.",
      ],
      color: "#4F46E5",
    },
    {
      title: "Software Engineer Intern",
      company: "Hamilton Digital Assets",
      location: "Chicago, IL",
      period: "Oct 2024 – Dec 2024",
      description: [
        "Led a cross-functional team to design and implement a secure authentication system using MongoDB, Kafka, and Key Cloak, improving data security and reducing unauthorized access by 40%.",
        "Developed cross-platform mobile and web applications using React/React Native, optimizing performance to improve load times by 20% and reduce session drop-offs by 25%.",
        "Built and deployed an AI-powered chatbot system, reducing support response times from 15 minutes to 2 minutes.",
        "Conducted client meetings to perform market research and collaborated on technical design documents, aligning project goals with client needs and ensuring 95% satisfaction in project deliverables.",
      ],
      color: "#8B5CF6",
    },
    {
      title: "Graduate Teaching Assistant",
      company: "Illinois Institute of Technology",
      location: "Chicago, IL",
      period: "Aug 2024 - Dec 2024",
      description: [
        "Assisting professors in teaching Software Project Management courses to graduate students.",
        "Providing guidance and support to students working on software development projects.",
        "Evaluating student assignments and providing constructive feedback.",
        "Organizing and conducting tutoring sessions to help students understand complex topics.",
      ],
      color: "#EC4899",
    },
    {
      title: "Full Stack Software Engineer Intern",
      company: "Varcons' Tech Pvt Ltd",
      location: "Bengaluru, KA",
      period: "Aug 2022 - Sept 2022",
      description: [
        "Engineered front-end and back-end solutions using HTML, CSS, JavaScript, and Django, improving application responsiveness by 15% and optimizing a tea-selling platform, increasing website speed by 20%.",
        "Increased website traffic by 35% through responsive design implementation and enhanced user experience, leading to higher engagement and customer retention.",
        "Streamlined the development workflow, reducing time-to-market by 25%, by architecting scalable frameworks that enhanced long-term performance and maintainability.",
        "Collaborated with a cross-functional team of 5+ members, delivering 3 high-quality solutions on time and within scope, improving team efficiency and product delivery.",
      ],
      color: "#3B82F6",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-white flex items-center">
          <span className="inline-block w-8 h-1 bg-purple-600 mr-3"></span>
          Album Collection
          <Disc size={24} className="ml-3 text-purple-500" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              onClick={() => setActiveExp(index)}
              className={`rounded-lg overflow-hidden cursor-pointer transition-transform ${
                activeExp === index ? "scale-105" : "hover:scale-102"
              }`}
            >
              <div
                className="relative aspect-square"
                style={{ backgroundColor: exp.color }}
              >
                {/* Album Cover Design */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-3/4 h-3/4 rounded-full bg-black/30 flex items-center justify-center p-2">
                    <div className="w-full h-full rounded-full bg-black/50 flex flex-col items-center justify-center text-center p-4">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-white/80 text-sm">{exp.company}</p>
                    </div>
                  </div>
                </div>

                {/* Record Spin Animation */}
                {activeExp === index && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1/3 h-1/3 rounded-full border-4 border-white/20 animate-spin-slow"></div>
                  </div>
                )}
              </div>

              <div className="bg-gray-800 p-4">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300 text-sm">{exp.period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300 text-sm">{exp.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Album Details */}
        <div className="mt-10 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            {experiences[activeExp].title} at {experiences[activeExp].company}
          </h3>
          <p className="text-gray-400 mb-4">
            <span className="text-purple-400">
              {experiences[activeExp].period}
            </span>{" "}
            • {experiences[activeExp].location}
          </p>
          <ul className="space-y-3">
            {experiences[activeExp].description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-xs text-white mt-1 mr-3">
                  ♪
                </span>
                <p className="text-gray-300">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
