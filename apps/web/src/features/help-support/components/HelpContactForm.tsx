import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Input from "@/features/auth/signup/components/ui/Input";

export default function HelpContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Support request submitted successfully!");
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="border border-neutral-border/50 rounded-2xl bg-background p-6 sm:p-8 shadow-sm">
      <h2 className="text-lg font-bold text-foreground mb-2">Still need help?</h2>
      <p className="text-xs text-neutral-subtext mb-6">
        Can&apos;t find what you are looking for? Submit a support request and our team will get back to you within 24 hours.
      </p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CheckCircle2 className="w-12 h-12 text-brand-accent mb-4" />
          <h3 className="text-sm font-bold text-foreground mb-1">Request Received</h3>
          <p className="text-xs text-neutral-subtext max-w-sm mb-6">
            Thank you for reaching out. We have sent a confirmation email to <span className="font-semibold">{email}</span>.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-brand-accent text-white text-xs font-bold rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              labelText="Name"
              placeholder="Juan Dela Cruz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            />
            <Input
              labelText="Email"
              placeholder="juan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
          </div>

          <Input
            labelText="Subject"
            placeholder="e.g., Payout verification issue"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            type="text"
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-foreground">Message</label>
            <textarea
              rows={4}
              placeholder="Describe your issue in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="px-3 py-2 text-xs border border-neutral-border/60 rounded-2xl bg-background text-foreground focus:outline-none focus:border-brand-accent transition-colors resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 mt-2 px-4 py-2 bg-brand-accent text-white text-xs font-bold rounded-2xl cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Send className="w-3.5 h-3.5" />
            Submit Request
          </button>
        </form>
      )}
    </div>
  );
}
