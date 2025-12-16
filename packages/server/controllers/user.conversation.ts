// CRUD operations for user management
import type { Conversation } from "../models/Conversation";
import { prisma } from "../prisma.client";

export async function getUser(req, res) {
  try {
    const userId = req.params.id;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Fetched User:", user);
    res.json({ id: userId, name: "John Doe" });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        createdAt: new Date(),
        conversations: [] as Conversation[],
      },
    });
    console.log("Created User:", newUser);
    res.status(201).json({ id: "new-id", name, email });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });
    console.log("Updated User:", updatedUser);
    res.json({ id: userId, name, email });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    await prisma.user.delete({ where: { id: userId } });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
