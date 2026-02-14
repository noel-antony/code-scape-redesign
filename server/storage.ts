import { db } from "./db";
import { 
  contactMessages, 
  newsletterSubscribers,
  type InsertContactMessage, 
  type InsertNewsletterSubscriber 
} from "@shared/schema";

export interface IStorage {
  createContactMessage(message: InsertContactMessage): Promise<void>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createContactMessage(message: InsertContactMessage): Promise<void> {
    await db.insert(contactMessages).values(message);
  }

  async createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<void> {
    await db.insert(newsletterSubscribers).values(subscriber).onConflictDoNothing();
  }
}

export const storage = new DatabaseStorage();
