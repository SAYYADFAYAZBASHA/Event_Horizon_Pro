import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+91 97030 29115",
      href: "tel:+919703029115",
    },
    {
      icon: Mail,
      title: "Email",
      content: "fayaz1234basha@gmail.com",
      href: "mailto:fayaz1234basha@gmail.com",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Anantapur, Andhra Pradesh, India",
      href: "#",
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Sat: 9AM - 8PM",
      href: "#",
    },
  ];

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-medium">Get In Touch</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold mb-4">
              Let's Create{" "}
              <span className="gradient-text">Magic Together</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Have a vision for your perfect event? We'd love to hear about it
              and help bring it to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-6 lg:p-8"
            >
              <h2 className="text-2xl font-display font-bold mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl glass border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl glass border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl glass border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Event Type
                  </label>
                  <select
                    required
                    value={formData.eventType}
                    onChange={(e) =>
                      setFormData({ ...formData, eventType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl glass border-border/50 focus:border-primary outline-none bg-transparent"
                  >
                    <option value="" className="bg-card">Select event type</option>
                    <option value="Marriage" className="bg-card">Wedding</option>
                    <option value="Birthday" className="bg-card">Birthday</option>
                    <option value="Corporate" className="bg-card">Corporate Event</option>
                    <option value="Engagement" className="bg-card">Engagement</option>
                    <option value="Anniversary" className="bg-card">Anniversary</option>
                    <option value="Baby Shower" className="bg-card">Baby Shower</option>
                    <option value="Other" className="bg-card">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl glass border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent resize-none"
                    placeholder="Tell us about your dream event..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold disabled:opacity-50 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.title}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="glass rounded-xl p-5 hover:neon-glow transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-secondary">
                          <info.icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{info.title}</h4>
                          <p className="text-muted-foreground text-sm">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-2xl p-6 lg:p-8"
              >
                <h3 className="text-xl font-display font-bold mb-6">
                  Why Choose Event Handler?
                </h3>
                <div className="space-y-4">
                  {[
                    "10+ years of event management experience",
                    "500+ successful events delivered",
                    "Dedicated event coordinators",
                    "Customized packages for every budget",
                    "24/7 support during your event",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
