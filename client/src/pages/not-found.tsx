import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6 text-destructive animate-pulse">
        <AlertTriangle className="w-8 h-8" />
      </div>
      
      <h1 className="text-5xl font-bold mb-4 font-mono">404</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
        The page you are looking for has been moved, deleted, or possibly never existed.
      </p>

      <Link href="/">
        <Button size="lg" className="font-semibold">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
