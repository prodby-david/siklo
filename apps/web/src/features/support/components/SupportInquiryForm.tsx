import { FormEvent } from "react";
import { Send, AlertCircle } from "lucide-react";
import { SupportInquiryFormState, ConcernCategory } from "../types/support.types";
import { CONCERN_CATEGORIES } from "../constants/support.constants";

interface SupportInquiryFormProps {
  formState: SupportInquiryFormState;
  onChangeField: (field: keyof SupportInquiryFormState, value: string) => void;
  onSubmit: (e: FormEvent) => void;
  isSubmitting: boolean;
}

export default function SupportInquiryForm({
  formState,
  onChangeField,
  onSubmit,
  isSubmitting,
}: SupportInquiryFormProps) {
  const selectableCategories = CONCERN_CATEGORIES.filter((c) => c.id !== "all");

  return (
    <div className="rounded-2xl border border-neutral-border/70 bg-card p-5 sm:p-7 shadow-xs space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-foreground">
          Submit a Specific Concern
        </h2>
        <p className="text-xs text-neutral-subtext">
          Tell us what you need help with. Our customer care team will review your inquiry and get back to you via your registered email.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Your Name
            </label>
            <input
              type="text"
              value={formState.fullName}
              onChange={(e) => onChangeField("fullName", e.target.value)}
              placeholder="Your full name"
              required
              className="w-full h-10 px-3 text-xs rounded-xl bg-neutral-table-stripe border border-neutral-border text-foreground placeholder:text-neutral-subtext focus:border-brand-accent focus:outline-none transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">
              Registered Email
            </label>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => onChangeField("email", e.target.value)}
              placeholder="name@example.com"
              required
              className="w-full h-10 px-3 text-xs rounded-xl bg-neutral-table-stripe border border-neutral-border text-foreground placeholder:text-neutral-subtext focus:border-brand-accent focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Concern Topic
          </label>
          <select
            value={formState.category}
            onChange={(e) =>
              onChangeField("category", e.target.value as ConcernCategory)
            }
            className="w-full h-10 px-3 text-xs rounded-xl bg-neutral-table-stripe border border-neutral-border text-foreground focus:border-brand-accent focus:outline-none transition-colors"
          >
            {selectableCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Circle Name <span className="text-neutral-subtext font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={formState.groupName}
            onChange={(e) => onChangeField("groupName", e.target.value)}
            placeholder="e.g. Office Weekly Paluwagan"
            className="w-full h-10 px-3 text-xs rounded-xl bg-neutral-table-stripe border border-neutral-border text-foreground placeholder:text-neutral-subtext focus:border-brand-accent focus:outline-none transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-foreground">
            Concern Details
          </label>
          <textarea
            value={formState.details}
            onChange={(e) => onChangeField("details", e.target.value)}
            placeholder="Please describe your concern in detail. For payment issues, specify the date and cycle number if applicable..."
            rows={4}
            required
            className="w-full p-3 text-xs rounded-xl bg-neutral-table-stripe border border-neutral-border text-foreground placeholder:text-neutral-subtext focus:border-brand-accent focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="flex items-start gap-2 p-3 rounded-xl bg-neutral-table-stripe border border-neutral-border/60 text-[11px] text-neutral-subtext">
          <AlertCircle className="w-3.5 h-3.5 text-neutral-subtext shrink-0 mt-0.5" />
          <span>
            Please do not include sensitive financial passwords, MPIN, or bank PINs in your message.
          </span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-2xl bg-brand-accent text-brand-accent-foreground text-xs font-bold shadow-xs hover:bg-brand-accent-hover transition-all cursor-pointer active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSubmitting ? "Submitting..." : "Send Request to Support"}</span>
        </button>
      </form>
    </div>
  );
}
