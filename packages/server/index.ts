import express from "express";
import dotenv from "dotenv";
import { conversationController } from "./controllers/conversation.controller";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Hello, World! ${process.env.MODEL_API_KEY}`);
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;

  const responseMessage = await conversationController(prompt);
  res.json({ message: responseMessage });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
