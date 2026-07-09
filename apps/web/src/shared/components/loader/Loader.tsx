type LoaderProps = {
  text?: string;
  variant?: "fullScreen" | "container" | "inline";
};

export default function Loader({ text = "Loading...", variant = "fullScreen" }: LoaderProps) {
  const spinnerElement = (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 border-4 border-neutral-border/30 dark:border-neutral-border/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
        <div className="text-xl font-black text-brand-accent animate-pulse select-none">S</div>
      </div>
      {text && (
        <p className="text-[10px] font-bold text-neutral-subtext uppercase tracking-widest animate-pulse text-center">
          {text}
        </p>
      )}
    </div>
  );

  if (variant === "inline") {
    return spinnerElement;
  }

  if (variant === "container") {
    return (
      <div className="w-full min-h-[250px] flex items-center justify-center p-8 bg-neutral-subtext/5 rounded-2xl border border-neutral-border/50">
        {spinnerElement}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 dark:bg-background/25 backdrop-blur-sm">
      <div className="relative flex flex-col items-center justify-center bg-background border border-neutral-border/50 py-10 px-12 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm w-full mx-4 animate-fade-in">
        {spinnerElement}
      </div>
    </div>
  );
}
