"use client";

import Link from "next/link";
import Image from "next/image";
import {
  User,
  Send,
  Crown,
  CheckCircle2,
  ArrowRight,
  LifeBuoy,
} from "lucide-react";
import Loader from "@/shared/components/loader/Loader";
import useChatUI from "../hooks/useChatUI";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";

export default function ChatUI() {
  const {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    error,
    getMessageText,
    messagesEndRef,
  } = useChatUI();
  const { data: user, isLoading: isUserLoading } = useGetCurrentName();

  if (isUserLoading) {
    return <Loader />;
  }

  if (user?.subscriptionPlan !== "PREMIUM") {
    const currentPlan = user?.subscriptionPlan || "FREE";
    return (
      <div className="flex flex-col h-[calc(100dvh-61px)] md:h-screen w-full bg-neutral-subtext/5 p-4 sm:p-6 md:p-8 items-center justify-center">
        <section className="mx-auto flex w-full max-w-xl flex-col items-center text-center rounded-none border border-neutral-border/80 bg-card p-6 sm:p-8 shadow-xs">
          <div className="relative mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/25">
              <Crown className="h-8 w-8" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-xl bg-card border border-neutral-border shadow-xs overflow-hidden">
              <Image
                src="/images/siklo-mascot.png"
                alt="Siklo mascot"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 mb-3">
            <Crown className="w-3.5 h-3.5" />
            <span>Premium Exclusive</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground mb-2">
            Siklo AI Assistant is for Premium
          </h1>

          <p className="text-xs sm:text-sm text-neutral-subtext max-w-md mb-6 leading-relaxed">
            Get instant answers to your savings questions, automatic cycle date calculations, and turn reminders anytime.
          </p>

          <div className="w-full rounded-2xl bg-neutral-table-stripe border border-neutral-border/70 p-4 mb-6 text-left space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold pb-2 border-b border-neutral-border/50">
              <span className="text-neutral-subtext">Your Current Plan:</span>
              <span className="font-extrabold text-foreground uppercase tracking-wider">
                {currentPlan === "FREE" ? "Starter (Free)" : currentPlan}
              </span>
            </div>
            <ul className="space-y-2 text-xs text-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>24/7 instant answers about your groups & rotation rules</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Smart payout date calculations and turn schedule estimates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0" />
                <span>Priority assistance without waiting for queue response</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
            <Link
              href="/pricing"
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-brand-accent text-brand-accent-foreground text-xs font-bold shadow-xs hover:bg-brand-accent-hover transition-all cursor-pointer active:scale-98"
            >
              <span>Upgrade to Premium (₱199/mo)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/assistance"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-neutral-table-stripe border border-neutral-border text-foreground text-xs font-bold hover:bg-neutral-subtext/10 transition-all cursor-pointer"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-neutral-subtext" />
              <span>Visit Assistance</span>
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-61px)] md:h-screen w-full bg-card overflow-hidden">
      <header className="flex shrink-0 items-center justify-between border-b border-neutral-border/70 bg-card px-4 py-3 sm:px-6 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-accent/10">
            <Image
              src="/images/siklo-mascot.png"
              alt="Siklo"
              width={40}
              height={40}
              className="h-full w-full object-contain p-1"
              priority
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full ring-2 ring-card" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-extrabold text-foreground sm:text-base">
              Siklo
            </h1>
            <p className="truncate text-xs text-neutral-subtext">
              Your personal Paluwagan savings companion
            </p>
          </div>
        </div>
      </header>

      <div className="relative flex-1 overflow-y-auto bg-neutral-subtext/5 p-4 sm:p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
          <Image
            src="/images/siklo-mascot.svg"
            alt=""
            width={380}
            height={380}
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain opacity-[0.06] dark:opacity-[0.04] pointer-events-none select-none"
            priority
          />
        </div>

        <div className="relative z-10 flex w-full flex-col gap-3">
          {messages.map((message) => {
            const isUser = message.role === "user";
            const text = getMessageText(message);

            return (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}
              >
                {!isUser && (
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-accent/10 shadow-2xs">
                    <Image
                      src="/images/siklo-mascot.png"
                      alt="Siklo"
                      width={36}
                      height={36}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[78%] lg:max-w-3xl xl:max-w-4xl rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isUser
                      ? "rounded-tr-xs bg-brand-accent text-brand-accent-foreground font-medium"
                      : "rounded-tl-xs border border-neutral-border/80 bg-card text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{text}</p>
                </div>

                {isUser && (
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-accent/15 text-brand-accent font-bold text-xs shadow-2xs">
                    {user?.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt={user.name || "User"}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    ) : user?.name ? (
                      user.name.charAt(0).toUpperCase()
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start justify-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-accent/10 shadow-2xs">
                <Image
                  src="/images/siklo-mascot.png"
                  alt="Siklo"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain p-1"
                />
              </div>
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-xs border border-neutral-border/80 bg-card px-4 py-2 text-xs sm:text-sm text-neutral-subtext shadow-2xs">
                <span>Siklo is thinking</span>
                <span className="flex gap-1 items-center">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-accent [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-accent [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-accent" />
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center px-2 py-1">
              <div className="max-w-md rounded-xl border border-danger-border/60 bg-danger-bg px-3 py-2 text-center text-xs text-danger shadow-2xs">
                <span className="leading-relaxed">
                  {error.message ||
                    "Something went wrong. Please try again."}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <footer className="shrink-0 border-t border-neutral-border/70 bg-card p-3 sm:p-4 md:px-8">
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center gap-2 rounded-full border border-neutral-border bg-neutral-table-stripe/60 p-1.5 pl-4 transition-all duration-200 focus-within:border-brand-accent focus-within:bg-card focus-within:ring-2 focus-within:ring-brand-accent/20"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Message Siklo"
              placeholder="Ask about Paluwagan rules, cycle dates, or payouts..."
              disabled={isLoading}
              className="h-9 min-w-0 flex-1 bg-transparent px-1 text-xs sm:text-sm text-foreground outline-none placeholder:text-neutral-subtext disabled:opacity-50"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={isLoading || !input.trim()}
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-accent text-brand-accent-foreground transition-all duration-200 hover:bg-brand-accent-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-accent"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
