import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export const insertNewsletterSchema = z.object({
  email: z.string().email("Invalid email"),
});

export type InsertContactMessage = z.infer<typeof insertContactSchema>;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSchema>;

export function useContact() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: InsertContactMessage) => {
    setIsPending(true);
    try {
      insertContactSchema.parse(data);
      // Simulate submission (no backend)
      await new Promise((r) => setTimeout(r, 500));
      toast({
        title: "Message Sent",
        description: "We'll be in touch shortly.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}

export function useNewsletter() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: InsertNewsletterSubscriber) => {
    setIsPending(true);
    try {
      insertNewsletterSchema.parse(data);
      // Simulate subscription (no backend)
      await new Promise((r) => setTimeout(r, 500));
      toast({
        title: "Subscribed!",
        description: "Welcome to our newsletter.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending };
}
