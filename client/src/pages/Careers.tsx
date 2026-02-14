import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Careers() {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Join the Team</h1>
          <p className="text-xl text-muted-foreground">
            We are looking for passionate engineers, designers, and thinkers to help us build the future.
          </p>
        </div>

        <div className="grid gap-6">
          {[
            { title: "Senior Frontend Engineer", type: "Full-time", loc: "Remote / SF", dept: "Engineering" },
            { title: "Backend Developer (Go/Node)", type: "Full-time", loc: "Remote", dept: "Engineering" },
            { title: "Product Designer", type: "Contract", loc: "Remote", dept: "Design" },
          ].map((job, i) => (
            <div 
              key={i}
              className="p-6 md:p-8 rounded-xl bg-card border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/50 transition-colors cursor-pointer group"
            >
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{job.dept}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>{job.loc}</span>
                </div>
              </div>
              <Button variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground">
                Apply Now <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
