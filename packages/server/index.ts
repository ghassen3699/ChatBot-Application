import express from 'express';
import dotenv from 'dotenv';
import { HfInference } from "@huggingface/inference";

dotenv.config();
const hf = new HfInference(process.env.CHATBOT_HUGGINGFACE_READ_TOKEN);

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Hello, World! ${process.env.MODEL_API_KEY}`);
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  const prompt = `User: TEST\nBot:`;

  const result = await hf.textGeneration({
    model: "HuggingFaceH4/zephyr-7b-beta",
    inputs: prompt
  });

  res.json({ message: result.generated_text });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});