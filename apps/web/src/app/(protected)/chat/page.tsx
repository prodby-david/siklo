"use client";

import { MessageSquare, Bot, User, Send } from "lucide-react";
import useChatUI from "@/features/chat/hooks/useChatUI";

export default function ChatPage() {
  const {
    messages,
    input,
    handleSubmit,
    isLoading,
    error,
    getMessageText,
    messagesEndRef,
    register,
  } = useChatUI();

  return (
    <div className="flex flex-col h-[100vh] bg-background">
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-border bg-background/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground text-base">Siklo</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-neutral-subtext">Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((m) => {
          const isUser = m.role === "user";
          const text = getMessageText(m);
          return (
            <div
              key={m.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"} items-start gap-3`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-2.5 text-sm ${
                  isUser
                     ? "bg-brand-accent text-white rounded-tr-none"
                     : "bg-muted text-foreground rounded-tl-none border border-neutral-border"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
              </div>
              {isUser && (
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-muted text-foreground rounded-2xl rounded-tl-none px-4 py-2.5 text-sm border border-neutral-border flex items-center gap-2">
              <span className="text-neutral-subtext">Siklo is thinking</span>
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-subtext animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-subtext animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-subtext animate-bounce" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center p-4">
            <div className="bg-danger bg-opacity-10 text-danger text-sm border border-color-danger-border px-4 py-2 rounded-xl flex items-center gap-2">
              <span>Something went wrong. Please try again.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-neutral-border bg-background/80 backdrop-blur-md"
      >
        <div className="max-w-4xl mx-auto flex items-center gap-2 bg-muted/50 rounded-2xl p-1.5 border border-neutral-border focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/20 transition-all duration-200">
          <input
            {...register("message")}
            placeholder="Ask Siklo Assistant..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-brand-accent hover:bg-brand-accent-hover text-white p-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:hover:bg-brand-accent shrink-0 cursor-pointer active:scale-95 flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
