import React, { useState } from "react";
import { Terminal, Code, Database, Cloud, Cpu, BookOpen } from "lucide-react";
import { useScrollReveal, useMouse3D } from "../hooks/useScrollReveal";

const AboutMe = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [headerRef, headerVisible] = useScrollReveal();
  const [bioRef, bioVisible] = useScrollReveal(0.1);
  const [skillsRef, skillsVisible] = useScrollReveal(0.1);
  const mouse3d = useMouse3D();

  const skillCategories = [
    {
      title: "Languages",
      icon: <Terminal size={18} />,
      iconColor: "var(--gold)",
      iconBg: "var(--gold-subtle)",
      iconBorder: "var(--bg-card-border-hover)",
      skills: ["Python", "Java", "C/C++", "JavaScript", "TypeScript", "Go", "C#", "SQL", "HTML", "CSS"],
    },
    {
      title: "Frameworks",
      icon: <Code size={18} />,
      iconColor: "#c27840",
      iconBg: "rgba(194,120,64,0.08)",
      iconBorder: "rgba(194,120,64,0.2)",
      skills: ["React", "Next.js", "Node.js", "Flask", "FastAPI", "Django", "Angular", "Spring Boot", "GraphQL", "React Native", "LangGraph"],
    },
    {
      title: "Databases & Tools",
      icon: <Database size={18} />,
      iconColor: "#4ecdc4",
      iconBg: "rgba(78,205,196,0.08)",
      iconBorder: "rgba(78,205,196,0.2)",
      skills: ["MongoDB", "PostgreSQL", "DynamoDB", "Redis", "Firebase", "Pinecone", "Postman", "Grafana"],
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud size={18} />,
      iconColor: "#5b8def",
      iconBg: "rgba(91,141,239,0.08)",
      iconBorder: "rgba(91,141,239,0.2)",
      skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Terraform", "Git"],
    },
  ];

  return (
    <section id="about" className="relative section-padding overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 glow-line" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'var(--gold-subtle)' }} />

      <div className="section-container relative">
        {/* Header */}
        <div ref={headerRef} className={`max-w-3xl mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--gold)' }}>About</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 t-text">
            The Composer Behind
            <span className="text-gradient"> the Code</span>
          </h2>
        </div>

        {/* Bio + Info */}
        <div ref={bioRef} className={`grid grid-cols-1 lg:grid-cols-5 gap-12 mb-28 transition-all duration-1000 delay-200 ${bioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Bio */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              A digital composer who orchestrates ideas into symphonic code.
              I conduct algorithms like musical arrangements, harmonize scalable
              architectures with perfect pitch, and compose applications that resonate
              with users' needs.
            </p>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-tertiary)' }}>
              Currently mastering the art of Computer Science at
              Illinois Institute of Technology while building the future's
              soundtrack, one line of code at a time.
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <a href="https://linkedin.com/in/suhaspalani/" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2.5 px-6" aria-label="Visit LinkedIn profile">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
              <a href="https://github.com/SuhasPalani" target="_blank" rel="noopener noreferrer" className="btn-ghost text-sm py-2.5 px-6" aria-label="Visit GitHub profile">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Info cards with 3D tilt */}
          <div className="lg:col-span-2 space-y-4" ref={mouse3d.ref} style={{ perspective: '1000px' }}>
            {[
              { icon: <Cpu size={16} />, label: "Current Focus", value: "AI/ML, Cloud Architecture, Full-Stack Development" },
              { icon: <BookOpen size={16} />, label: "Education", value: "MS Computer Science, Illinois Institute of Technology" },
            ].map((item, i) => (
              <div key={i} className="card-3d p-5" style={{
                transform: `rotateX(${mouse3d.rotateX * 0.3}deg) rotateY(${mouse3d.rotateY * 0.3}deg)`,
                transition: 'transform 0.3s ease-out',
              }}>
                <div className="flex items-center gap-3 mb-2">
                  <div style={{ color: 'var(--gold)' }}>{item.icon}</div>
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{item.label}</span>
                </div>
                <p className="font-medium text-sm" style={{ color: 'var(--text-secondary)' }}>{item.value}</p>
              </div>
            ))}

            <div className="card-3d p-5" style={{
              transform: `rotateX(${mouse3d.rotateX * 0.3}deg) rotateY(${mouse3d.rotateY * 0.3}deg)`,
              transition: 'transform 0.3s ease-out',
            }}>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Quick Stats</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { num: "25+", label: "Projects" },
                  { num: "20+", label: "Technologies" },
                  { num: "3+", label: "Years Exp." },
                  { num: "3.6", label: "GPA" },
                ].map((stat, i) => (
                  <div key={i} className="text-center py-2.5 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-card-border)' }}>
                    <p className="text-xl font-display font-bold text-gradient">{stat.num}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div ref={skillsRef} className={`transition-all duration-1000 ${skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-12">
            <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Tech Stack</p>
            <h3 className="text-3xl md:text-4xl font-display font-bold t-text">
              Tools of the <span className="text-gradient">Trade</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 perspective-2000">
            {skillCategories.map((cat, catIdx) => (
              <div key={catIdx} className="card-3d p-6 group hover:-translate-y-2" style={{ transitionDelay: `${catIdx * 100}ms` }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: cat.iconBg, border: `1px solid ${cat.iconBorder}`, color: cat.iconColor }}>
                    {cat.icon}
                  </div>
                  <h4 className="text-base font-display font-semibold t-text">{cat.title}</h4>
                  <span className="ml-auto text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{cat.skills.length}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      onMouseEnter={() => setHoveredSkill(`${catIdx}-${idx}`)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`tag-pill cursor-default ${
                        hoveredSkill === `${catIdx}-${idx}` ? 'scale-105' : ''
                      }`}
                      style={hoveredSkill === `${catIdx}-${idx}` ? { background: 'var(--gold-subtle)', borderColor: 'var(--bg-card-border-hover)', color: 'var(--gold)' } : {}}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
