"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { sendMessageAction } from "./actions";
import { Message } from "@/lib/ai";

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hello! I'm your CareerLift Coach. How can I help you with your resume or job search today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput("");
        setLoading(true);

        try {
            // Optimistic update
            setMessages(prev => [...prev, { role: "user", content: userMsg }]);

            const newHistory = await sendMessageAction(messages, userMsg);
            setMessages(newHistory);
        } catch (error) {
            console.error("Failed to send message", error);
            // Revert or show error
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* 
         Height calc is a rough estimate to fit within the dashboard layout 
         (assuming header/padding). Adjust as needed.
      */}

            <div className="flex-1 overflow-y-auto p-4 space-y-4 rounded-xl bg-slate-50 border shadow-inner mb-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""
                            }`}
                    >
                        <div className={`p-2 rounded-full shrink-0 ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"
                            }`}>
                            {msg.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                        </div>

                        <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${msg.role === "user"
                                ? "bg-blue-600 text-white rounded-tr-none"
                                : "bg-white text-slate-800 border rounded-tl-none"
                            }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full shrink-0 bg-emerald-600 text-white">
                            <Bot className="h-5 w-5" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none border shadow-sm text-slate-500">
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="relative">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about your resume..."
                    className="w-full p-4 pr-14 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
}
