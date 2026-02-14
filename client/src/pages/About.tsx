import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Target, Users, Zap } from "lucide-react";
import { useRef } from "react";
import alexImg from "@assets/alex.png";
import saraImg from "@assets/sara.png";
import jamesImg from "@assets/james.png";

/** Horizontal scrolling text band */
function TextMarquee({ text, direction = 1 }: { text: string; direction?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap py-4">
      <motion.div
        className="inline-block"
        animate={{ x: direction > 0 ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-3xl md:text-5xl font-bold text-white/[0.03] mx-6 select-none">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function About() {
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div className="pt-24 pb-0">
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >We are the architects of the digital future.</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-xl text-muted-foreground leading-relaxed mb-6">
            Founded in 2020, Codescape was born from a simple belief: software should not just function — it should perform. We combine aesthetic excellence with rigorous engineering.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="text-left inline-block space-y-2 text-muted-foreground">
            {[
              "50+ projects shipped across 12 industries",
              "Remote-first team across 4 time zones",
              "Long-term partnerships over one-off contracts",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                className="flex items-center gap-2"
              >
                <span className="text-primary">→</span> {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Scrolling text band — adds depth between sections */}
      <div className="overflow-hidden mb-8">
        <TextMarquee text="DESIGN · ENGINEER · DELIVER ·" direction={1} />
        <TextMarquee text="ARCHITECTURE · SCALE · PERFORM ·" direction={-1} />
      </div>

      {/* Philosophy Grid */}
      <section className="bg-surface-1 py-24 md:py-32" ref={parallaxRef}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="text-3xl font-bold mb-12 text-center"
          >Our Philosophy</motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Performance First", text: "Speed isn't a feature, it's a requirement. We optimize every byte." },
              { icon: Target, title: "Precision", text: "We measure twice and cut once. Quality assurance is built-in." },
              { icon: Users, title: "User Centric", text: "We build for humans, solving real problems with intuitive design." },
              { icon: Code2, title: "Clean Code", text: "Maintainable, scalable, and documented codebases are our standard." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="text-center p-6 rounded-2xl bg-surface-2/50 border border-white/5 hover:border-primary/20 transition-colors duration-300 cursor-default"
              >
                <motion.div
                  className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="text-3xl font-bold mb-12"
        >Leadership Team</motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Alex Chen", role: "CTO", bg: "bg-blue-500/10", img: alexImg },
            { name: "Sarah Miller", role: "Head of Design", bg: "bg-blue-500/10", img: saraImg },
            { name: "James Wilson", role: "Engineering Lead", bg: "bg-green-500/10", img: jamesImg },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group cursor-default"
            >
              <div className={`aspect-square rounded-2xl ${member.bg} overflow-hidden relative transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-primary/10`}>
                <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
}
