import type { Conversation } from "./Conversation";

// User Model
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  conversations: Conversation[];
}
