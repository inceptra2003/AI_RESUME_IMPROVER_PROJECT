"use server";

import { getChatResponse, Message } from "@/lib/ai";

export async function sendMessageAction(history: Message[], newMessage: string) {
    if (!newMessage.trim()) return history;

    // Add user message
    const userMessage: Message = { role: "user", content: newMessage };
    const updatedHistory = [...history, userMessage];

    // Get AI response
    const aiContent = await getChatResponse(updatedHistory);
    const aiMessage: Message = { role: "assistant", content: aiContent };

    return [...updatedHistory, aiMessage];
}
