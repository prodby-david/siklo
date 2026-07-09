import { Loader2 } from "lucide-react";

type ButtonProps = {
  isSubmitting: boolean;
  text: string;
};

export default function Submit({ isSubmitting, text }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full flex h-10 items-center justify-center rounded-2xl bg-brand-accent text-xs font-bold text-white hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
    >
      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : text}
    </button>
  );
}
