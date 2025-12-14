import express from 'express';
import dotenv from 'dotenv';
import { InferenceClient } from "@huggingface/inference";

dotenv.config();
const client = new InferenceClient(process.env.CHATBOT_HUGGINGFACE_READ_TOKEN);


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
  const { prompt } = req.body;

  const chatCompletion = await client.chatCompletion({
    model: "openai/gpt-oss-120b:fastest",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 100,
    temperature: 0.7,
    conversion_id: "unique-conversation-id",
  });
  const responseMessage = chatCompletion.choices[0]?.message?.content || "No response";
  res.json({ message: responseMessage });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});