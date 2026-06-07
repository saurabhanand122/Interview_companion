'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

const stories = [
  {
    name: 'Kabir Mehta',
    role: 'Software Engineer @ Vercel',
    story: 'Codey the Architect was tough, but the real-time algorithm checks helped me speak about complex logic during my Vercel interview. Highly recommended!',
    image: '/images/success_1.png',
  },
  {
    name: 'Aanya Sen',
    role: 'Product Manager @ Stripe',
    story: 'The behavioral practice with Olivia helped me format my answers using the STAR structure. The pacing metrics kept me from speaking too fast under pressure.',
    image: '/images/success_2.png',
  },
  {
    name: 'Divya Iyer',
    role: 'Quantitative Intern @ Jane Street',
    story: 'Practicing economics scenarios and fast logic cues helped me gain confidence. The instant transcript diagnostics pinpointed exactly what I needed to refine.',
    image: '/images/success_3.png',
  },
];

export default function SuccessStories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="flex flex-col gap-8 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1.5 border-b border-border/40 pb-4 text-center md:text-left">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Success Stories</h2>
        <p className="text-muted-foreground text-sm font-medium">Hear from candidates who cleared mock loops and landed target offers</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {stories.map((story, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative border border-border bg-card/65 backdrop-blur-md rounded-3xl p-6 shadow-md flex flex-col gap-5 overflow-hidden transition-all duration-300"
          >
            {/* Ambient background accent */}
            <div className="absolute top-[-30px] right-[-30px] size-24 rounded-full bg-violet-600/5 blur-xl pointer-events-none group-hover:bg-violet-600/10 transition-colors" />

            <Quote className="absolute top-6 right-6 size-8 text-primary/10 group-hover:text-primary/20 transition-colors" />

            {/* Profile Image & Meta */}
            <div className="flex items-center gap-4">
              <div className="relative size-14 rounded-2xl overflow-hidden border border-border shadow-xs shrink-0">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <h4 className="font-extrabold text-sm text-foreground group-hover:text-primary transition-colors">
                  {story.name}
                </h4>
                <p className="text-[10px] text-muted-foreground font-semibold leading-relaxed">
                  {story.role}
                </p>
                {/* 5 Star rating */}
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="size-3 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Story */}
            <p className="text-xs text-muted-foreground leading-relaxed font-semibold italic">
              "{story.story}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
