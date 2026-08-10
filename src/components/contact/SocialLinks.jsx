import { motion } from 'framer-motion';
import { socialLinks } from '../../data/socials';

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.filter((item) => item.href).map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
          >
            <Icon size={15} />
            {item.label}
          </motion.a>
        );
      })}
    </div>
  );
}
