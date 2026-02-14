import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Briefcase, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const jobs = [
  {
    title: "Senior Frontend Engineer",
    type: "Full-time",
    loc: "Remote / SF",
    dept: "Engineering",
    description: "Build and maintain high-performance React applications powering our core platform. You'll work closely with design and backend teams to ship features end-to-end.",
    responsibilities: [
      "Architect scalable component systems with React & TypeScript",
      "Optimize rendering performance and bundle sizes",
      "Mentor junior engineers and conduct code reviews",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend Developer (Go/Node)",
    type: "Full-time",
    loc: "Remote",
    dept: "Engineering",
    description: "Design and build resilient APIs and microservices that handle millions of requests daily. Strong focus on reliability and observability.",
    responsibilities: [
      "Build and maintain RESTful and gRPC APIs",
      "Design database schemas and optimize query performance",
      "Implement CI/CD pipelines and infrastructure-as-code",
    ],
    stack: ["Go", "Node.js", "PostgreSQL", "Docker", "AWS"],
  },
  {
    title: "Product Designer",
    type: "Contract",
    loc: "Remote",
    dept: "Design",
    description: "Shape the user experience across our entire product suite. You'll own the design process from research through final hand-off to engineering.",
    responsibilities: [
      "Lead user research and translate findings into wireframes",
      "Create high-fidelity prototypes in Figma",
      "Maintain and evolve the design system",
    ],
    stack: ["Figma", "Prototyping", "Design Systems", "User Research"],
  },
];

function JobCard({ job, index }: { job: typeof jobs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="rounded-xl bg-card border border-white/5 hover:border-primary/30 transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      {/* Header row */}
      <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{job.dept}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{job.type}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.loc}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            Apply Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="text-muted-foreground"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/5 pt-6 space-y-5">
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground/70 mb-3">What you'll do</h4>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + j * 0.06, duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-primary mt-0.5">→</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.stack.map((tech) => (
                  <span key={tech} className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Careers() {
  return (
    <div className="pt-24 pb-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >Join the Team</motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            We are looking for passionate engineers, designers, and thinkers to help us build the future.
          </motion.p>
        </div>

        <div className="grid gap-6 pb-24 md:pb-32">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
