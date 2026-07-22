import type { Metadata } from "next";
import ThemeProvider from "@/shared/providers/ThemeProvider";
import "./globals.css";
import { Toaster } from "sonner";
import { Plus_Jakarta_Sans } from "next/font/google";
import TanstackQueryProvider from "@/shared/providers/TanstackQueryProvider";

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siklo",
  description: "A management tool for your paluwagan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <TanstackQueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TanstackQueryProvider>
        <Toaster
          richColors
          toastOptions={{
            classNames: {
              toast: "bg-brand-accent text-foreground border-neutral-border",
              success: "text-success bg-success-bg border-success/20",
              error: "text-danger bg-danger-bg border-color-danger-border",
            },
          }}
          position="bottom-right"
        />
      </body>
    </html>
  );
}
