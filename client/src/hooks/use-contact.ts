import { useMutation } from "@tanstack/react-query";
import { api, type InsertContactMessage, type InsertNewsletterSubscriber } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useContact() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const validated = api.contact.submit.input.parse(data);
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We'll be in touch shortly.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
}

export function useNewsletter() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertNewsletterSubscriber) => {
      const validated = api.newsletter.subscribe.input.parse(data);
      const res = await fetch(api.newsletter.subscribe.path, {
        method: api.newsletter.subscribe.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to subscribe");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Welcome to our newsletter.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });
}
