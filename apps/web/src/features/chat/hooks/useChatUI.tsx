import { useState, useEffect, useRef } from "react";
import { generateId, type UIMessage } from "ai";
import { api } from "@/shared/lib/axios";
import { useForm } from "react-hook-form";
import axios from "axios";

export interface ChatFormInput {
  message: string;
}

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

  const { register, handleSubmit, reset, watch, setValue } =
    useForm<ChatFormInput>({
      defaultValues: {
        message: "",
      },
    });

  const input = watch("message") || "";
  const setInput = (val: string) => {
    setValue("message", val);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "submitted" || status === "streaming";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const onFormSubmit = async (data: ChatFormInput) => {
    const inputVal = data.message.trim();
    if (!inputVal || isLoading) return;

    setError(null);
    const userMessage: UIMessage = {
      id: generateId(),
      role: "user",
      parts: [{ type: "text", text: inputVal }],
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    reset({ message: "" });
    setStatus("submitted");

    try {
      const response = await api.post("http://localhost:3001/chat", {
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

  const getMessageText = (message: UIMessage) => {
    if (message.parts && Array.isArray(message.parts)) {
      return message.parts
        .map((part) => (part.type === "text" ? part.text : ""))
        .join("");
    }
    return "";
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
    handleSubmit: handleSubmit(onFormSubmit),
    getMessageText,
    register,
  };
}
