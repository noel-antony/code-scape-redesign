import { motion } from "framer-motion";
import { Code2, Target, Users, Zap } from "lucide-react";
import alexImg from "@assets/alex.png";
import saraImg from "@assets/sara.png";
import jamesImg from "@assets/james.png";

export default function About() {
  return (
    <div className="pt-24 pb-0">
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >We are the architects of the digital future.</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground leading-relaxed mb-6">
            Founded in 2020, Codescape was born from a simple belief: software should not just function — it should perform. We combine aesthetic excellence with rigorous engineering.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-left inline-block space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><span className="text-primary">→</span> 50+ projects shipped across 12 industries</li>
            <li className="flex items-center gap-2"><span className="text-primary">→</span> Remote-first team across 4 time zones</li>
            <li className="flex items-center gap-2"><span className="text-primary">→</span> Long-term partnerships over one-off contracts</li>
          </motion.ul>
        </div>
      </div>

      {/* Philosophy Grid */}
      <section className="bg-surface-1 py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Philosophy</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Performance First", text: "Speed isn't a feature, it's a requirement. We optimize every byte." },
              { icon: Target, title: "Precision", text: "We measure twice and cut once. Quality assurance is built-in." },
              { icon: Users, title: "User Centric", text: "We build for humans, solving real problems with intuitive design." },
              { icon: Code2, title: "Clean Code", text: "Maintainable, scalable, and documented codebases are our standard." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <item.icon className="w-8 h-8" />
                </div>
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
        <h2 className="text-3xl font-bold mb-12">Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Alex Chen", role: "CTO", bg: "bg-blue-500/10", img: alexImg },
            { name: "Sarah Miller", role: "Head of Design", bg: "bg-blue-500/10", img: saraImg },
            { name: "James Wilson", role: "Engineering Lead", bg: "bg-green-500/10", img: jamesImg },
          ].map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`aspect-square rounded-2xl ${member.bg} overflow-hidden relative transition-all duration-300 group-hover:scale-[1.02]`}>
                <img src={member.img} alt={member.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mt-4">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
}
