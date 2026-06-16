import type { Metadata } from "next";
import Footer from "@/shared/components/footer/Footer";
import ThemeProvider from "@/shared/components/theme/ThemeProvider";
import "./globals.css";
import { Toaster } from "sonner";
import { Inter } from "next/font/google";

const inter = Inter({
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
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
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
