import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSchema, type InsertNewsletterSubscriber } from "@/hooks/use-contact";
import { useNewsletter } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Linkedin, Github, Mail, MapPin } from "lucide-react";
import iconImg from "@assets/no-bg-icon_1771048731548.png";

export default function Footer() {
  const { mutate, isPending } = useNewsletter();
  
  const form = useForm<InsertNewsletterSubscriber>({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: InsertNewsletterSubscriber) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={iconImg} alt="Icon" className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight">CODESCAPE</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Engineering digital excellence. We build scalable, reliable, and innovative software solutions for forward-thinking enterprises.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Linkedin, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { label: 'About Us', href: '/about-us' },
                { label: 'Services', href: '/services' },
                { label: 'Projects', href: '/case-studies' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>123 Innovation Drive<br />Tech Valley, CA 94043</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>hello@codescape.tech</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Newsletter</h4>
            <p className="text-muted-foreground mb-4">Subscribe to our engineering blog and tech insights.</p>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="bg-background border-white/10"
                {...form.register("email")}
              />
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground/50 italic">Built with long-term maintainability in mind.</p>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Codescape Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
