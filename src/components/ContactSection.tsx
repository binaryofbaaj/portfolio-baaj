"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSending(true);
      setErrorMessage("");
      
      try {
        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            template_id: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
            template_params: {
              name: formData.name,
              from_name: formData.name,
              email: formData.email,
              from_email: formData.email,
              message: formData.message,
              title: "New Portfolio Message",
              to_name: personalInfo.name,
            },
          }),
        });

        if (response.ok) {
          setSubmitted(true);
          setFormData({ name: "", email: "", message: "" });
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          const errorData = await response.text();
          console.error("EmailJS Error:", errorData);
          setErrorMessage("Failed to send message. Please check your configuration.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setErrorMessage("Network error. Please try again later.");
      } finally {
        setIsSending(false);
      }
    }
  };

  const socialLinks = [
    {
      icon: <FiGithub size={20} />,
      href: personalInfo.social.github,
      label: "GitHub",
      color: "var(--text-primary)",
    },
    {
      icon: <FiLinkedin size={20} />,
      href: personalInfo.social.linkedin,
      label: "LinkedIn",
      color: "#0a66c2",
    },
    {
      icon: <FiMail size={20} />,
      href: `mailto:${personalInfo.email}`,
      label: "Email",
      color: "var(--accent-green)",
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-4" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-[var(--accent-green)] text-sm font-mono">// 06</span>
          <h2 className="section-heading text-[var(--text-primary)] mt-2">
            <span className="text-[var(--accent-green)]">&gt; </span>Contact
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[var(--accent-green)] to-transparent mt-3" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="text-[var(--text-secondary)] text-xs ml-2">contact.sh</span>
              </div>
              <div className="terminal-body">
                <p className="text-[var(--text-secondary)] text-sm mb-4">
                  <span className="text-[var(--accent-green)]">$ </span>cat contact_info.txt
                </p>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-[var(--accent-purple)]">email</span>
                    <span className="text-[var(--text-secondary)]">: </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-[var(--accent-green)] hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  <div className="text-sm">
                    <span className="text-[var(--accent-purple)]">status</span>
                    <span className="text-[var(--text-secondary)]">: </span>
                    <span className="text-[var(--accent-green)]">
                      Available for opportunities
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[var(--accent-purple)]">response_time</span>
                    <span className="text-[var(--text-secondary)]">: </span>
                    <span className="text-[var(--accent-cyan)]">&lt; 24 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 hover:border-[var(--text-secondary)]"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 15px ${link.color}20`,
                  }}
                  aria-label={link.label}
                >
                  {link.icon}
                  <span className="text-sm font-mono hidden sm:inline">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3"
          >
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="text-[var(--text-secondary)] text-xs ml-2">
                  send_message.sh
                </span>
              </div>
              <div className="terminal-body">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="text-4xl mb-3">✅</div>
                    <p className="text-[var(--accent-green)] font-mono">
                      Message sent successfully!
                    </p>
                    <p className="text-[var(--text-secondary)] text-sm mt-2">
                      I&apos;ll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="text-xs font-mono text-[var(--accent-green)] block mb-1.5">
                        $ enter_name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-[var(--bg-base)] border border-[var(--border-base)] rounded-md px-4 py-2.5 text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-green)] transition-colors placeholder:text-[var(--text-quaternary)]"
                        placeholder="John Doe"
                        id="contact-name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1 font-mono">
                          ⚠ {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs font-mono text-[var(--accent-green)] block mb-1.5">
                        $ enter_email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-[var(--bg-base)] border border-[var(--border-base)] rounded-md px-4 py-2.5 text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-green)] transition-colors placeholder:text-[var(--text-quaternary)]"
                        placeholder="you@example.com"
                        id="contact-email"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 font-mono">
                          ⚠ {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-mono text-[var(--accent-green)] block mb-1.5">
                        $ compose_message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        rows={4}
                        className="w-full bg-[var(--bg-base)] border border-[var(--border-base)] rounded-md px-4 py-2.5 text-sm text-[var(--text-primary)] font-mono focus:outline-none focus:border-[var(--accent-green)] transition-colors placeholder:text-[var(--text-quaternary)] resize-none"
                        placeholder="Your message..."
                        id="contact-message"
                      />
                      {errors.message && (
                        <p className="text-red-400 text-xs mt-1 font-mono">
                          ⚠ {errors.message}
                        </p>
                      )}
                    </div>

                    {errorMessage && (
                      <div className="p-3 bg-red-900/20 border border-red-500/50 rounded text-red-400 text-xs font-mono mb-4">
                        ⚠ ERROR: {errorMessage}
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSending}
                      className={`w-full py-3 rounded-md font-mono font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                        isSending 
                          ? "bg-[var(--text-quaternary)] text-[var(--text-tertiary)] cursor-not-allowed" 
                          : "bg-[var(--accent-green)] text-[var(--bg-base)] hover:bg-[var(--accent-cyan)]"
                      }`}
                      whileHover={!isSending ? {
                        scale: 1.02,
                        boxShadow: "0 0 25px rgba(0,255,65,0.3)",
                      } : {}}
                      whileTap={!isSending ? { scale: 0.98 } : {}}
                    >
                      {isSending ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                          $ executing_transmit...
                        </span>
                      ) : (
                        <>
                          <FiSend size={16} />$ send_message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
