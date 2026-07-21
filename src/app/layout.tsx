import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/env-validation";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SunnTech - Cybersecurity Freelance Platform",
  description: "Find cybersecurity freelance projects for freshers and professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={jetbrainsMono.className}>{children}</body>
    </html>
  );
}
