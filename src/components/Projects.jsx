import React, { useState } from "react";
import { ExternalLink, Calendar, Award } from "lucide-react";
import { FaEllipsisH } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All"); // Filter state

  const projects = [
    {
      title: "AI-Powered Report Generator",
      period: "Feb 2025",
      description:
        "AI-powered report generator improving efficiency in report creation",
      details: [
        "Developed an AI-powered report generator using OpenAI's GPT-4 and Mistral AI to create customized reports based on user input, improving report generation efficiency by 20%.",
        "Integrated image upload with AI-generated captions and automatic table of contents generation, enhancing report personalization and organization by 15%.",
        "Implemented architecture diagram generation from Python code blocks, automatically visualizing code structure and module relationships, streamlining technical documentation by 25%.",
        "Built a user-friendly Streamlit interface for seamless report customization, styling options, and easy download, improving user accessibility and interaction by 30%.",
      ],
      categories: ["AI", "Software Engineering"],
      color: "#7209B7",
      image: "/ai-report-generator.jpg",
      link: "https://github.com/SuhasPalani/AI_Report_Generator",
    },
    {
      title: "Voice-Based Code Generator",
      period: "Feb 2025",
      description:
        "Voice-based code generation tool to improve development speed",
      details: [
        "Developed a voice-based code generation application using React for the frontend and Flask for the backend, enabling users to generate code through voice commands and improving development speed by 30%.",
        "Integrated OpenAI and Google LLM APIs for speech-to-text and code generation, reducing code generation time by 15% and increasing code complexity by 12% without compromising performance.",
        "Implemented audio processing pipelines using Pydub and ffmpeg for seamless conversion and resampling of audio files, improving transcription accuracy by 25% and reducing processing delays by 12%.",
        "Created an intuitive React-based interface using the Web Audio API for capturing and processing voice commands, delivering generated code explanations in under 2 seconds.",
      ],
      categories: ["AI", "Software Engineering"],
      color: "#4361EE",
      image: "/voice-code-generator.jpg",
      link: "https://github.com/SuhasPalani/voice_based_code_generator",
    },
    {
      title: "Voice-Activated Task Scheduler",
      period: "Jan 2025",
      description:
        "Voice-activated task scheduler with reminders and task management",
      details: [
        "Developed a voice-activated task scheduler using Twilio and OpenAI's APIs for seamless speech-to-text and text-to-speech capabilities, improving user interaction by 20%.",
        "Integrated OpenAI's Whisper for speech-to-text and TTS for converting text back to speech, enhancing system usability and accuracy by 25%.",
        "Automated task management, enabling users to schedule tasks via voice, reducing manual input time by 15%.",
        "Implemented WhatsApp reminders using Twilio API, notifying users of upcoming deadlines, leading to a 15% increase in task completion rates.",
        "Leveraged the 'schedule' library to trigger automated reminders based on set deadlines, streamlining task tracking and improving overall efficiency by 10%.",
      ],
      categories: ["AI"],
      color: "#F72585",
      image: "/task-scheduler.jpg",
      link: "https://github.com/SuhasPalani/task_scheduler",
    },
    {
      title: "Weather Dashboard",
      period: "Dec 2024 - Jan 2025",
      description:
        "Full-stack weather dashboard with real-time insights and AI chatbot",
      details: [
        "Developed a full-stack Weather Dashboard to display real-time weather data using React and Chart.js for interactive visualizations.",
        "Integrated Flask backend to fetch weather data using WeatherAPI, and used MongoDB to store and retrieve weather information.",
        "Built a real-time chatbot assistant using OpenAI API to provide users with weather-related insights and answers.",
        "Implemented search and suggestion features to allow users to query weather data by city, state, or zip code.",
        "Focused on user experience by providing a responsive and intuitive UI with real-time data updates.",
      ],
      categories: ["Software Engineering", "Cloud", "AI"],
      color: "#FF9F00",
      image: "/weather-dashboard.jpg",
      link: "https://github.com/SuhasPalani/weather-dashboard",
    },
    {
      title: "Bitcoin Prediction",
      period: "Dec 2024 - Present",
      description: "ML-based system for Bitcoin price trend forecasting",
      details: [
        "Developed ML_Bitcoin_Prediction system with D3.js for interactive data visualization of Bitcoin price trends and forecasts.",
        "Implemented multiple machine learning models, with ARIMA providing 95.2% accuracy on a 15-year dataset.",
        "Utilized time series forecasting to improve predictive accuracy and decision-making for cryptocurrency market analysis.",
        "Currently working on buy and sell strategy integration based on ARIMA predictions for automated trading decisions.",
      ],
      categories: ["ML", "Software Engineering"],
      color: "#00A4A6",
      image: "/bitcoin-prediction.jpg",
      link: "https://github.com/SuhasPalani/ML_Bitcoin_Prediction",
    },
    {
      title: "SUMMARAIZE",
      period: "Apr 2024 - Sept 2024",
      description: "Multimodal AI platform with web and mobile apps",
      details: [
        "Developed a multimodal AI platform with web and mobile apps using Python Flask, MongoDB, HTML, CSS, JavaScript, and React Native.",
        "Enhanced mobile user engagement by 28% through optimized design and chatbot integration.",
        "Led API testing and validation using Postman, covering 25+ endpoints.",
        "Achieved top recognition at OraHacks and TikTok tech jam finalist status.",
      ],
      categories: ["AI", "Software Engineering"],
      color: "#4CAF50",
      image: "/summaraize.jpg",
      link: "https://github.com/SuhasPalani/summaraize-native",
    },
    {
      title: "AIRBNB DATA PIPELINE OPTIMIZATION",
      period: "Jun 2024 - Jul 2024",
      description: "Optimized DBT data pipeline for improved performance",
      details: [
        "Built a robust data pipeline using DBT, ensuring clean datasets and optimized query performance in Snowflake.",
        "Automated ETL process, cutting manual data processing time by 50%.",
        "Implemented rigorous testing strategies for data quality and integrity.",
      ],
      categories: ["Other"],
      color: "#FF5722",
      image: "/dbt-pipeline.jpg",
      link: "https://github.com/SuhasPalani/DBT",
    },
    {
      title: "GitHub Analytics Dashboard",
      period: "Mar 2024 - Apr 2024",
      description: "Real-time GitHub repository activity analytics",
      details: [
        "Developed a React-based web application to display real-time data from popular GitHub repositories.",
        "Deployed the application on Google Cloud Platform (GCP).",
        "Built a Flask backend server to handle API requests and process data.",
        "Integrated machine learning models to predict and forecast repository activity trends.",
        "Created interactive data visualizations using Plotly and Matplotlib.",
        "Optimized data processing and model execution for faster response times.",
      ],
      categories: ["Cloud", "ML", "Software Engineering"],
      color: "#795548",
      image: "/github-analytics.jpg",
      link: "https://github.com/SuhasPalani/spm-assignment-5",
    },
    // Add more projects as needed
  ];

  const filters = [
    { name: "All", icon: FaLaptopCode },
    { name: "Cloud", icon: FaCloud },
    { name: "AI", icon: FaBrain },
    { name: "Software Engineering", icon: FaCode },
    { name: "Other", icon: FaEllipsisH },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-white flex items-center">
          <span className="inline-block w-8 h-1 bg-purple-600 mr-3"></span>
          Featured Tracks
          <Award size={24} className="ml-3 text-purple-500" />
        </h2>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setActiveFilter(filter.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
                activeFilter === filter.name ? "bg-purple-500" : "bg-gray-800"
              }`}
            >
              <filter.icon size={18} />
              {filter.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg shadow-purple-900/10 transform transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Vinyl Record Design */}
              <div
                className="h-48 relative overflow-hidden"
                style={{ backgroundColor: project.color }}
              >
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${
                    hoveredProject === index ? "scale-110" : "scale-100"
                  }`}
                >
                  <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Vinyl Grooves */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 border border-black/20 rounded-full -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: `${(i + 1) * 40}px`,
                        height: `${(i + 1) * 40}px`,
                        opacity: hoveredProject === index ? 0.6 : 0.3,
                      }}
                    ></div>
                  ))}
                </div>

                {/* Project Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                  <h3 className="text-white font-bold">{project.title}</h3>
                  <p className="text-gray-300 text-sm">{project.description}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Calendar size={16} className="text-gray-400 mr-2" />
                  <span className="text-gray-300 text-sm">
                    {project.period}
                  </span>
                </div>

                <ul className="space-y-2 mb-4">
                  {project.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-gray-400 text-sm flex items-start"
                    >
                      <span className="text-purple-500 mr-2 mt-1">◆</span>
                      <span>
                        {detail.length > 100
                          ? detail.substring(0, 100) + "..."
                          : detail}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View Project <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
