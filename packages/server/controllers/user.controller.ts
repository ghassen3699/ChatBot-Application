// CRUD operations for user management
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  updateUserService,
} from "../services/user.service";

export async function getUserController(req, res) {
  try {
    const userId = req.params.id;

    const user = await getUserByIdService(userId);
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

export async function createUserController(req, res) {
  try {
    const { name, email } = req.body;
    const newUser = await createUserService({ name, email });
    console.log("Created User:", newUser);
    res.status(201).json({ id: "new-id", name, email });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUserController(req, res) {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;
    const updatedUser = await updateUserService(userId, { name, email });
    console.log("Updated User:", updatedUser);
    res.json({ id: userId, name, email });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUserController(req, res) {
  try {
    const userId = req.params.id;
    await deleteUserService(userId);
    res.status(204).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
