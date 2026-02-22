import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Clock, Tag } from "lucide-react";

const articles = [
  { title: "Optimizing React Server Components for Scale",    date: "Oct 12, 2024", readTime: "8 min read",  tag: "Engineering",    excerpt: "A deep dive into caching strategies and data fetching patterns in Next.js 14. We cover deduplication, streaming, and how to avoid the most common performance pitfalls in production." },
  { title: "The Future of WebAssembly in FinTech",            date: "Sep 28, 2024", readTime: "6 min read",  tag: "Architecture",   excerpt: "How WASM is enabling near-native performance for complex calculations in the browser." },
  { title: "Designing for Dark Mode First",                    date: "Sep 15, 2024", readTime: "5 min read",  tag: "Design",         excerpt: "Why starting with dark mode can lead to better color systems and accessibility." },
  { title: "Kubernetes Cost Optimization at Scale",            date: "Sep 3, 2024",  readTime: "10 min read", tag: "Infrastructure",  excerpt: "Practical strategies for cutting cloud spend without sacrificing reliability — VPA, Spot instances, and right-sizing." },
  { title: "Building Accessible Component Libraries",         date: "Aug 22, 2024", readTime: "7 min read",  tag: "Design",         excerpt: "A guide to ARIA roles, keyboard navigation, and testing accessibility with real assistive technology." },
  { title: "Event-Driven Architecture with Kafka",             date: "Aug 10, 2024", readTime: "9 min read",  tag: "Architecture",   excerpt: "Understanding partitions, consumer groups, and exactly-once semantics when building distributed systems." },
  { title: "Fine-Tuning LLMs for Domain-Specific Tasks",      date: "Jul 30, 2024", readTime: "12 min read", tag: "AI",             excerpt: "End-to-end walkthrough of curating datasets, PEFT / LoRA fine-tuning, and evaluating model quality." },
  { title: "Zero-Downtime Deployments with Feature Flags",    date: "Jul 18, 2024", readTime: "6 min read",  tag: "Engineering",    excerpt: "How feature flags enable progressive rollouts, kill switches, and A/B testing across teams." },
  { title: "PostgreSQL Query Tuning in Practice",             date: "Jul 5, 2024",  readTime: "8 min read",  tag: "Engineering",    excerpt: "Using EXPLAIN ANALYZE, partial indexes, and connection pooling to tame slow queries under load." },
];

const ALL_TAGS = ["All", ...Array.from(new Set(articles.map((a) => a.tag)))];

const tagcolours: Record<string, string> = {
  Engineering:    "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Architecture:   "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Design:         "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Infrastructure: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  AI:             "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function Blog() {
  const [activeTag, setActiveTag] = useState("All");

  const featured = articles[0];
  const rest = articles.slice(1);
  const filtered = activeTag === "All" ? rest : rest.filter((a) => a.tag === activeTag);

  return (
    <div className="pt-24 pb-24 md:pb-32">
      <div className="container mx-auto px-4 md:px-6">

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Engineering Blog</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Ideas & Insights</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Deep dives into engineering, architecture, and design from the Codescape team.
          </p>
        </motion.div>

        {/* Featured article */}
        <Link href={`/blog/0`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.33, 1, 0.68, 1] }}
            className="group relative rounded-2xl border border-white/8 bg-card overflow-hidden mb-14 hover:border-primary/25 transition-colors duration-300 cursor-pointer"
          >
            {/* Accent glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(0,163,255,0.06), transparent)" }} />

            <div className="grid md:grid-cols-2 gap-0">
              {/* Text side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${tagColors(featured.tag)}`}>
                    {featured.tag}
                  </span>
                  <span className="text-xs text-muted-foreground/60 uppercase tracking-wider font-mono">Featured</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-200 leading-snug">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground/60 font-mono">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
              </div>

              {/* Visual side */}
              <div className="relative hidden md:flex items-center justify-center bg-surface-2 border-l border-white/5 min-h-[260px]">
                <div className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(0,163,255,0.1), transparent)" }} />
                <div className="relative z-10 flex flex-col items-center gap-3 opacity-40 group-hover:opacity-70 transition-opacity duration-300">
                  <Tag className="w-12 h-12 text-primary" strokeWidth={1} />
                  <span className="text-xs font-mono uppercase tracking-widest text-primary">{featured.tag}</span>
                </div>
                <div className="absolute bottom-6 right-6 flex items-center gap-1.5 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  Read article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>

        {/* Tag filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all duration-200 ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-white/10 text-muted-foreground hover:border-primary/30 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Article grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((article, i) => (
              <Link key={article.title} href={`/blog/${i + 1}`}>
                <motion.article
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                  className="group h-full rounded-xl border border-white/5 bg-card hover:border-primary/20 p-6 flex flex-col gap-4 cursor-pointer transition-colors duration-200 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-full border shrink-0 ${tagColors(article.tag)}`}>
                      {article.tag}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                  </div>

                  <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground/50 font-mono pt-1 border-t border-white/5">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-sm">
            No articles in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}

function tagColors(tag: string) {
  return tagcolours[tag] ?? "bg-white/5 text-muted-foreground border-white/10";
}
