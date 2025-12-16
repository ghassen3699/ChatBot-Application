// Conversation Model with gpt
export interface Conversation {
  id: string;
  userId: string;
  messages: { role: string; content: string }[];
  createdAt: Date;
}
