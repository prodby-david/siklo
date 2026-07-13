import { cn } from "@/shared/lib/utils";
import React from "react";

type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "code"
  | "lead"
  | "small";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: Variant;
  as?: React.ElementType;
}

const variantStyles: Record<Variant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic text-muted-foreground",
  code: "relative rounded-2xl bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  small: "text-sm font-medium leading-none",
};

export function Typography({
  variant = "p",
  as,
  className,
  ...props
}: TypographyProps) {
  const Component = as || (variant === "lead" ? "p" : variant);

  return (
    <Component className={cn(variantStyles[variant], className)} {...props} />
  );
}
