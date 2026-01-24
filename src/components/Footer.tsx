import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/sayyadfayazbasha-9703029115-2003-developer", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Dashboard", path: "/" },
      { name: "All Events", path: "/events" },
      { name: "Compare", path: "/compare" },
      { name: "Contact Us", path: "/contact" },
    ],
  },
  {
    title: "Event Types",
    links: [
      { name: "Weddings", path: "/events?category=Marriage" },
      { name: "Birthdays", path: "/events?category=Birthday" },
      { name: "Corporate", path: "/events?category=Corporate" },
      { name: "Engagements", path: "/events?category=Engagement" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Venue Selection", path: "#" },
      { name: "Decoration", path: "#" },
      { name: "Catering", path: "#" },
      { name: "Photography", path: "#" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="relative mt-20 pt-16 pb-8 glass-strong border-t border-border/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-display font-bold gradient-text">
                Event Handler
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Creating unforgettable moments and magical experiences for your
              most cherished celebrations.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:fayaz1234basha@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>fayaz1234basha@gmail.com</span>
              </a>
              <a
                href="tel:+919703029115"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+91 97030 29115</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Anantapur, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full glass hover:neon-glow transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Event Handler. All rights reserved. Crafted
            with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};
