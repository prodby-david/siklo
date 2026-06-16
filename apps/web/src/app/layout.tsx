import type { Metadata } from "next";
import Footer from "@/shared/components/footer/Footer";
import ThemeProvider from "@/shared/components/theme/ThemeProvider";
import "./globals.css";

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
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
