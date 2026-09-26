"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { generateId, type UIMessage } from "ai";
import { api } from "@/shared/lib/axios";
import axios from "axios";
import { getMessageText } from "../utils/chat.utils";

export default function useChatUI() {
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: generateId(),
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "Hello! I am Siklo, your personal paluwagan helper. I can help you create and manage your paluwagan groups. How can I assist you today?",
        },
      ],
    },
  ]);
  const [status, setStatus] = useState<
    "ready" | "submitted" | "streaming" | "error"
  >("ready");
  const [error, setError] = useState<Error | null>(null);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputVal = input.trim();
    if (!inputVal || isLoading) return;

    setError(null);
    const userMessage: UIMessage = {
      id: generateId(),
      role: "user",
      parts: [{ type: "text", text: inputVal }],
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setStatus("submitted");

    try {
      const response = await api.post("/chat", {
        messages: updatedMessages,
      });

      const replyText = response.data?.reply;

      const assistantMessage: UIMessage = {
        id: generateId(),
        role: "assistant",
        parts: [{ type: "text", text: replyText }],
      };
      setMessages([...updatedMessages, assistantMessage]);
      setStatus("ready");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(new Error(err.response?.data?.message || err.message));
      } else {
        setError(
          err instanceof Error ? err : new Error("Something went wrong"),
        );
      }
      setStatus("error");
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: generateId(),
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello! I am Siklo, your personal paluwagan helper. I can help you create and manage your paluwagan groups. How can I assist you today?",
          },
        ],
      },
    ]);
    setError(null);
    setInput("");
    setStatus("ready");
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    status,
    setStatus,
    error,
    setError,
    messagesEndRef,
    isLoading,
    scrollToBottom,
    handleSubmit: onFormSubmit,
    handleReset,
    getMessageText,
  };
}
