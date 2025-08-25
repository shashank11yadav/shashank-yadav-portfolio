'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, MessageSquare, Instagram, Code } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';
import { personalInfo } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

export default function ContactSection() {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // EmailJS configuration from old portfolio
  const SERVICE_ID = "service_vzx1309";
  const TEMPLATE_ID = "template_38052va";
  const USER_ID = "16wFkhh9-QEl71Ass";

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading("Sending message...", {
      duration: Infinity,
    });

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target as HTMLFormElement, USER_ID);

      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Dismiss loading and show success
      toast.dismiss(loadingToast);
      toast.success("Message successfully sent! 🚀", {
        duration: 4000,
      });
    } catch (error) {
      // Dismiss loading and show error
      toast.dismiss(loadingToast);
      toast.error("Failed to send message. Please try again.", {
        duration: 4000,
      });
      console.error("Email sending failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      id="contact" 
      className={`py-20 px-6 transition-all duration-700 ${
        isDark ? 'relative bg-slate-900/30' : ''
      }`}
      style={{
        background: !isDark 
          ? 'linear-gradient(135deg, #f8fafc 0%, #ddd6fe 50%, #e0e7ff 100%)'
          : undefined
      }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
              : 'bg-gradient-to-r from-cyan-600 to-purple-600'
          }`}>
            Let's Connect
          </h2>
          <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className={`backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transition-colors duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 border-slate-600/50'
                : 'bg-gradient-to-br from-slate-100/80 via-slate-50/60 to-slate-200/80 border-slate-300/50'
            }`}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30 mb-4">
                  <MessageSquare className={`transition-colors duration-300 ${
                    isDark ? 'text-cyan-400' : 'text-cyan-600'
                  }`} size={28} />
                </div>
                <h3 className={`text-2xl font-bold bg-clip-text text-transparent mb-2 ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500'
                    : 'bg-gradient-to-r from-cyan-600 to-purple-600'
                }`}>Let's Work Together</h3>
                <p className={`transition-colors duration-300 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>Have a project in mind? I'd love to hear about it.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="hidden"
                  name="to_email"
                  value={personalInfo.contact.email}
                />
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-700/70 border-slate-600 text-white placeholder-gray-400'
                          : 'bg-white/80 border-slate-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                      isDark ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                        isDark 
                          ? 'bg-slate-700/70 border-slate-600 text-white placeholder-gray-400'
                          : 'bg-white/80 border-slate-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 ${
                      isDark 
                        ? 'bg-slate-700/70 border-slate-600 text-white placeholder-gray-400'
                        : 'bg-white/80 border-slate-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-none ${
                      isDark 
                        ? 'bg-slate-700/70 border-slate-600 text-white placeholder-gray-400'
                        : 'bg-white/80 border-slate-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    isDark 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 hover:shadow-cyan-500/25'
                      : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 hover:shadow-cyan-600/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
        </motion.div>
      </div>
    </section>
  );
}