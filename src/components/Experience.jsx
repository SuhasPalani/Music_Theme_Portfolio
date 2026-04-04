import React, { useState } from "react";
import { Calendar, MapPin, ChevronRight, Briefcase } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Experience = () => {
  const [activeExp, setActiveExp] = useState(0);
  const [headerRef, headerVisible] = useScrollReveal();

  const experiences = [
    { title: "Full Stack Developer", company: "Tundra Technical Solutions", location: "Chicago, IL", period: "Nov 2025 - Present",
      color: "from-emerald-500 to-teal-600", dot: "bg-emerald-500",
      description: [
        "Led end-to-end development of an AI-powered customer support chatbot using Next.js, LangGraph, and OpenAI APIs.",
        "Designed a RAG-based backend with Pinecone, boosting recommendation relevance by 45% and reducing LLM hallucinations.",
        "Built AI-driven customer support workflows generating Jira tickets, helping internal teams resolve customer issues faster.",
        "Delivered production-ready application on Azure, reducing customer support workload by 40% globally.",
      ],
    },
    { title: "Software Engineer Intern", company: "ONEBIT, INC.", location: "Chicago, IL", period: "Aug 2025 - Nov 2025",
      color: "from-blue-500 to-indigo-600", dot: "bg-blue-500",
      description: [
        "Built an idempotent ETL pipeline for 2,000+ clients with distributed locking for data consistency.",
        "Developed a transfer detection service shielding 15% of transactions from expense misclassification.",
        "Implemented a double-entry ledger system ensuring 100% transactional balance and immutable audit trail.",
        "Created daily reconciliation confirming 99.8% cash balance accuracy.",
      ],
    },
    { title: "Full Stack Software Developer", company: "Budhhi Technologies", location: "Remote ", period: "Jan 2025 - Present",
      color: "from-rose-500 to-pink-600", dot: "bg-rose-500",
      description: [
        "Built AI matchmaking system using Python and TensorFlow, increasing match accuracy by 30%.",
        "Designed automated NDA platform on Node.js and AWS Lambda, cutting legal review times by 40%.",
        "Delivered responsive React/Redux applications with PostgreSQL, improving engagement by 25%.",
        "Deployed containerized AWS infrastructure with Docker, ensuring 99.9% uptime.",
      ],
    },
    { title: "Software Engineer Intern", company: "Hamilton Digital Assets", location: "Chicago, IL", period: "Oct 2024 - Dec 2024",
      color: "from-amber-500 to-orange-600", dot: "bg-amber-500",
      description: [
        "Architected authentication infrastructure using MongoDB, Kafka, and Keycloak, reducing vulnerabilities by 40%.",
        "Crafted React/React Native apps with GraphQL, improving load times by 20%.",
        "Supported AI-powered chatbot on Kubernetes, improving response times by 30%.",
      ],
    },
    { title: "Graduate Teaching Assistant", company: "Illinois Institute of Technology", location: "Chicago, IL", period: "Aug 2024 - Dec 2024",
      color: "from-cyan-500 to-blue-600", dot: "bg-cyan-500",
      description: [
        "Teaching Assistant for Software Project Management course.",
        "Assisted students with project management and software development practices.",
        "Conducted lab sessions and provided mentorship to graduate students.",
      ],
    },
    { title: "Full Stack Software Engineer", company: "Whiterock Technologies", location: "Bengaluru, KA", period: "Mar 2022 - May 2023",
      color: "from-yellow-500 to-amber-600", dot: "bg-yellow-500",
      description: [
        "Optimized website features improving page load speed by 15%, handling 500+ daily requests.",
        "Designed responsive layouts increasing mobile engagement by 20%.",
        "Developed REST API integrations reducing data inconsistencies by 25%.",
      ],
    },
    { title: "Software Developer Intern", company: "Varcons' Tech Pvt Ltd", location: "Bengaluru, KA", period: "Aug 2022 - Sept 2022",
      color: "from-purple-500 to-violet-600", dot: "bg-purple-500",
      description: [
        "Engineered solutions with HTML, CSS, JavaScript, and Django, boosting responsiveness by 15%.",
        "Launched traffic increases of 35% through responsive design.",
        "Reduced time-to-market by 25% through scalable frameworks.",
      ],
    },
  ];

  return (
    <section id="experience" className="relative section-padding overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 glow-line" />
      <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: 'var(--gold-subtle)' }} />

      <div className="section-container relative">
        <div ref={headerRef} className={`max-w-3xl mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-sm font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Experience</p>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 t-text">Professional <span className="text-gradient">Journey</span></h2>
          <p className="text-xl" style={{ color: 'var(--text-tertiary)' }}>Each role a unique composition in my career symphony.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Timeline sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-1 lg:sticky lg:top-24">
              {experiences.map((exp, index) => (
                <button key={index} onClick={() => setActiveExp(index)}
                  className="w-full text-left p-4 rounded-xl transition-all duration-300 group flex items-start gap-3"
                  style={{
                    background: activeExp === index ? 'var(--bg-card-hover)' : 'transparent',
                    border: `1px solid ${activeExp === index ? 'var(--bg-card-border)' : 'transparent'}`,
                  }}>
                  <div className="flex flex-col items-center pt-1 flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${activeExp === index ? exp.dot : ''} transition-colors duration-300`}
                      style={{ backgroundColor: activeExp !== index ? 'var(--bg-card-border)' : undefined }}>
                      {activeExp === index && <div className={`w-3 h-3 rounded-full ${exp.dot} animate-ping opacity-40`} />}
                    </div>
                    {index < experiences.length - 1 && <div className="w-px h-7 mt-1" style={{ backgroundColor: 'var(--bg-card-border)' }} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold truncate" style={{ color: activeExp === index ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{exp.company}</h4>
                      {activeExp === index && <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />}
                    </div>
                    <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{exp.title}</p>
                    <p className="text-[10px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{exp.period}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-8">
            <div className="glass-card p-6 md:p-8 sticky top-24">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${experiences[activeExp].color} flex items-center justify-center`}>
                      <Briefcase size={14} className="text-white" />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded bg-gradient-to-r ${experiences[activeExp].color} text-white`}>
                      {experiences[activeExp].period.includes("Present") ? "Current" : "Completed"}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-1 text-gradient">{experiences[activeExp].title}</h3>
                  <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>{experiences[activeExp].company}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="flex items-center gap-1.5"><Calendar size={12} />{experiences[activeExp].period}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={12} />{experiences[activeExp].location}</span>
                </div>
              </div>
              <div className="glow-line mb-8" />
              <div className="space-y-4">
                {experiences[activeExp].description.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${experiences[activeExp].color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity`}>{i + 1}</div>
                    <p className="leading-relaxed text-sm transition-colors" style={{ color: 'var(--text-primary)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
