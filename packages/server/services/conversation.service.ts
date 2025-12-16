// Conversation CRUD operations
import type { Conversation } from "../models/Conversation";
import { prisma } from "../prisma.client";

export async function getConversationByIdService(conversationId: string) {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    return conversation;
  } catch (error) {
    console.error("Error fetching conversation:", error);
    throw new Error("Internal server error");
  }
}

export async function createConversationService(data: {
  userId: string;
  title: string;
}) {
  try {
    const newConversation = await prisma.conversation.create({
      data: {
        title: data.title,
        userId: data.userId,
        createdAt: new Date(),
        messages: [] as string[],
      },
    });
    return newConversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Internal server error");
  }
}

export async function deleteConversationService(conversationId: string) {
  try {
    await prisma.conversation.delete({ where: { id: conversationId } });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    throw new Error("Internal server error");
  }
}

export async function addMessageToConversationService(
  conversationId: string,
  message: string
) {
  try {
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new Error("Conversation not found");
    }
    const updatedMessages = [...conversation.messages, message];
    const updatedConversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: { messages: updatedMessages },
    });
    return updatedConversation;
  } catch (error) {
    console.error("Error adding message to conversation:", error);
    throw new Error("Internal server error");
  }
}

export async function userHaveAConversationService(
  userId: string
): Promise<boolean> {
  return prisma.conversation
    .count({
      where: { userId: userId },
    })
    .then((count) => count > 0);
}
