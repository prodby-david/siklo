import { Loader2, UserPlus } from "lucide-react";

type ButtonProps = {
  isSubmitting: boolean;
  text: string;
  isRedirecting: boolean;
};

export default function Submit({
  isSubmitting,
  text,
  isRedirecting,
}: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || isRedirecting}
      className="w-full flex h-11 items-center justify-center gap-2 rounded-2xl bg-brand-accent text-xs sm:text-sm font-extrabold text-white hover:bg-brand-accent-hover active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2 transition-all duration-200"
    >
      {isSubmitting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          <span>{text}</span>
        </>
      )}
    </button>
  );
}
