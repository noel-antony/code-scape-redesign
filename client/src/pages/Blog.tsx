import { Link } from "wouter";

const articles = [
  {
    title: "Optimizing React Server Components for Scale",
    date: "Oct 12, 2024",
    readTime: "8 min read",
    tag: "Engineering",
    excerpt: "A deep dive into caching strategies and data fetching patterns in Next.js 14."
  },
  {
    title: "The Future of WebAssembly in FinTech",
    date: "Sep 28, 2024",
    readTime: "6 min read",
    tag: "Architecture",
    excerpt: "How WASM is enabling near-native performance for complex calculations in the browser."
  },
  {
    title: "Designing for Dark Mode First",
    date: "Sep 15, 2024",
    readTime: "5 min read",
    tag: "Design",
    excerpt: "Why starting with dark mode can lead to better color systems and accessibility."
  }
];

export default function Blog() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-16">Engineering Blog</h1>
        
        <div className="grid gap-12 max-w-4xl">
          {articles.map((article, i) => (
            <article key={i} className="group cursor-pointer border-b border-white/5 pb-12 last:border-0">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-mono">
                <span className="text-primary">{article.tag}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              
              <Link href={`/blog/${i}`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
              </Link>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
