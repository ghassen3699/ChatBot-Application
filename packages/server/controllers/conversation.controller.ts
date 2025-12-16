import { InferenceClient } from "@huggingface/inference";
import { userHaveAConversationService } from "../services/conversation.service";
const client = new InferenceClient(process.env.CHATBOT_HUGGINGFACE_READ_TOKEN);

// export async function conversationController(message: string): Promise<string> {
//   var chatHistory: { role: string; content: string }[] = [];
//   chatHistory.push({ role: "user", content: message });
//   const chatCompletion = await client.chatCompletion({
//     model: "openai/gpt-oss-120b:fastest",
//     messages: [...chatHistory, { role: "user", content: message }],
//     max_tokens: 100,
//     temperature: 0.7,
//   });
//   const responseMessage =
//     chatCompletion.choices[0]?.message?.content || "No response";
//   chatHistory.push({ role: "assistant", content: responseMessage });

//   console.log("All Chat responses:", chatHistory);
//   return responseMessage;
// }

export async function conversationController(
  userId: string,
  message: string
): Promise<string> {
  const userHaveAConversation = await userHaveAConversationService(userId);
}
