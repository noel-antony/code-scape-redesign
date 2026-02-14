import { motion } from "framer-motion";
import { Code2, Target, Users, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">We are the architects of the digital future.</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Founded in 2020, Codescape was born from a simple belief: that software should not just function, it should perform. We combine aesthetic excellence with rigorous engineering standards.
          </p>
        </div>
      </div>

      {/* Philosophy Grid */}
      <section className="bg-white/5 py-24 mb-24">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
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
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold mb-12">Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Alex Chen", role: "CTO", bg: "bg-blue-500/10" },
            { name: "Sarah Miller", role: "Head of Design", bg: "bg-purple-500/10" },
            { name: "James Wilson", role: "Engineering Lead", bg: "bg-green-500/10" },
          ].map((member, i) => (
            <div key={i} className="group">
              <div className={`aspect-square rounded-2xl ${member.bg} mb-6 overflow-hidden relative`}>
                {/* Abstract avatar placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold opacity-20 group-hover:opacity-40 transition-opacity">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
