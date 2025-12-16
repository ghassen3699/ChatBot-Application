import type { Conversation } from "../models/Conversation";
import { prisma } from "../prisma.client";

export async function getUserByIdService(userId: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Internal server error");
  }
}

export async function createUserService(data: { name: string; email: string }) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        createdAt: new Date(),
        conversations: [] as Conversation[],
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Internal server error");
  }
}

export async function updateUserService(
  userId: string,
  data: { name?: string; email?: string }
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Internal server error");
  }
}

export async function deleteUserService(userId: string) {
  try {
    await prisma.user.delete({ where: { id: userId } });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Internal server error");
  }
}
