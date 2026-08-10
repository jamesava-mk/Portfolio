import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SkillCategory from './SkillCategory';
import SectionHeading from '../ui/SectionHeading';
import { skillCategories, skillsContent } from '../../data/skills';

export default function Skills() {
  const [openCategory, setOpenCategory] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_46%,rgba(255,255,255,0.03)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <SectionHeading eyebrow={skillsContent.eyebrow} title={skillsContent.heading} description={skillsContent.intro} />
        </motion.div>

        <div className="mt-10 grid gap-4">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.title}
              {...category}
              isOpen={openCategory === index}
              onToggle={() => setOpenCategory(openCategory === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
