import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Globe, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [headerRef, headerVisible] = useScrollReveal();

  const emailJsConfig = {
    serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
    templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
    userId: process.env.REACT_APP_EMAILJS_USER_ID,
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, formData, emailJsConfig.userId)
      .then(() => { setIsSubmitting(false); setSubmitSuccess(true); setFormData({ name: "", email: "", message: "" }); setTimeout(() => setSubmitSuccess(false), 5000); },
        (err) => { setIsSubmitting(false); console.error("Failed:", err); });
  };

  const contacts = [
    { icon: <Mail size={16} />, title: "Email", value: "suhaspalani23@gmail.com", href: "mailto:suhaspalani23@gmail.com" },
    { icon: <Phone size={16} />, title: "Phone", value: "773-850-4663", href: "tel:773-850-4663" },
    { icon: <MapPin size={16} />, title: "Location", value: "Chicago, IL", href: "#" },
  ];

  const socials = [
    { icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, name: "LinkedIn", url: "https://linkedin.com/in/suhaspalani/" },
    { icon: <Github size={14} />, name: "GitHub", url: "https://github.com/SuhasPalani" },
    { icon: <Globe size={14} />, name: "Portfolio", url: "https://suhaspalani23.netlify.app/" },
  ];

  const inputStyle = (field) => ({
    background: focusedField === field ? 'var(--bg-card-hover)' : 'var(--bg-card)',
    border: `1px solid ${focusedField === field ? 'var(--bg-card-border-hover)' : 'var(--bg-card-border)'}`,
    boxShadow: focusedField === field ? '0 0 20px var(--gold-subtle)' : 'none',
    color: 'var(--text-primary)', transition: 'all 0.3s',
  });

  return (
    <section id="contact" className="relative section-padding overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 glow-line" />

      <div className="section-container relative">
        <div ref={headerRef} className={`max-w-3xl mb-16 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--gold)' }}>Contact</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 t-text">Let's <span className="text-gradient">Connect</span></h2>
          <p className="text-lg" style={{ color: 'var(--text-tertiary)' }}>Have an idea or opportunity? Let's orchestrate something amazing together.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <div className="glass-card p-5 space-y-3">
              {contacts.map((c, i) => (
                <a key={i} href={c.href} className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group" style={{ ':hover': { background: 'var(--bg-card-hover)' } }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--gold-subtle)', color: 'var(--gold)' }}>{c.icon}</div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{c.title}</p>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{c.value}</p>
                  </div>
                  <ArrowUpRight size={12} className="ml-auto" style={{ color: 'var(--text-muted)' }} />
                </a>
              ))}
            </div>
            <div className="glass-card p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Social</p>
              <div className="flex flex-wrap gap-2">
                {socials.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-2 px-4">{s.icon}<span className="ml-2">{s.name}</span></a>)}
              </div>
            </div>
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, var(--gold), #c27840)' }}>
                <span className="font-display font-bold text-sm" style={{ color: 'var(--bg-primary)' }}>SP</span>
              </div>
              <div>
                <p className="text-sm font-medium t-text">Ready to collaborate</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Open to full-time, contract, and freelance</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-display font-bold t-text mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                {[{ id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' }].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-tertiary)' }}>{f.label}</label>
                    <input type={f.type} id={f.id} name={f.id} value={formData[f.id]} onChange={handleChange}
                      onFocus={() => setFocusedField(f.id)} onBlur={() => setFocusedField(null)} required
                      className="w-full rounded-xl px-4 py-3 text-sm outline-none placeholder-gray-600" style={inputStyle(f.id)} placeholder={f.placeholder} />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block text-sm mb-2 font-medium" style={{ color: 'var(--text-tertiary)' }}>Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} required rows="5"
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none placeholder-gray-600" style={inputStyle('message')} placeholder="Tell me about your project..." />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center ${
                    submitSuccess ? '' : 'hover:scale-[1.02]'
                  }`}
                  style={{
                    background: isSubmitting ? 'var(--bg-card)' : submitSuccess ? 'rgba(16,185,129,0.1)' : 'linear-gradient(135deg, var(--gold), #c27840)',
                    color: isSubmitting ? 'var(--text-muted)' : submitSuccess ? '#10b981' : 'var(--bg-primary)',
                    border: submitSuccess ? '1px solid rgba(16,185,129,0.2)' : 'none',
                  }}>
                  {isSubmitting ? 'Sending...' : submitSuccess ? 'Message sent successfully!' : <><Send size={14} className="mr-2" /> Send Message</>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
