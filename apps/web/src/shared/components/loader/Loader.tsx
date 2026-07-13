import Image from "next/image";

type LoaderProps = {
  text?: string;
  variant?: "fullScreen" | "container" | "inline";
};

export default function Loader({ text = "Loading...", variant = "fullScreen" }: LoaderProps) {
  const spinnerElement = (
    <div className="relative flex flex-col items-center justify-center gap-5">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute inset-0 border border-neutral-border/20 dark:border-neutral-border/10 rounded-full"></div>
        <div className="absolute inset-0 border border-brand-accent border-t-transparent rounded-full animate-spin [animation-duration:1.6s]"></div>
        <div className="relative w-20 h-20 animate-siklo-float flex items-center justify-center">
          <Image
            src="/images/siklo-loading.png"
            alt="Siklo Loading Mascot"
            width={80}
            height={80}
            className="object-contain select-none"
            priority
          />
        </div>
      </div>
      {text && (
        <p className="text-[10px] font-bold text-neutral-subtext dark:text-neutral-subtext/80 uppercase tracking-widest animate-pulse text-center leading-relaxed max-w-[200px]">
          {text}
        </p>
      )}
    </div>
  );

  if (variant === "inline") {
    return (
      <div className="relative inline-flex items-center gap-2">
        <div className="relative w-6 h-6 flex items-center justify-center">
          <div className="absolute inset-0 border border-neutral-border/20 dark:border-neutral-border/10 rounded-full"></div>
          <div className="absolute inset-0 border border-brand-accent border-t-transparent rounded-full animate-spin [animation-duration:1.2s]"></div>
          <div className="relative w-4 h-4 animate-siklo-float flex items-center justify-center">
            <Image
              src="/images/siklo-loading.png"
              alt="Siklo Loading Mascot"
              width={16}
              height={16}
              className="object-contain select-none"
              priority
            />
          </div>
        </div>
        {text && (
          <span className="text-[9px] font-bold text-neutral-subtext dark:text-neutral-subtext/80 uppercase tracking-wider">
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === "container") {
    return (
      <div className="w-full min-h-[250px] flex items-center justify-center p-8 bg-neutral-subtext/2 dark:bg-neutral-subtext/5 rounded-[20px] border border-neutral-border/20 dark:border-neutral-border/10 backdrop-blur-sm">
        {spinnerElement}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/40 dark:bg-background/25 backdrop-blur-sm animate-fade-in">
      <div className="relative flex flex-col items-center justify-center bg-background/85 dark:bg-background/75 border border-neutral-border/30 dark:border-neutral-border/10 py-8 px-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] backdrop-blur-xl max-w-[260px] w-full mx-4">
        {spinnerElement}
      </div>
    </div>
  );
}


