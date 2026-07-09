import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "স্মার্ট ডিজিটাল কৃষক অ্যাডভাইজর | AI ও IoT ভিত্তিক কৃষি ব্যবস্থাপনা",
  description: "বাংলাদেশের কৃষকদের জন্য আধুনিক, AI ও IoT ভিত্তিক স্মার্ট ডিজিটাল ফার্ম অ্যাডভাইজর প্ল্যাটফর্ম। মাটির বিশ্লেষণ, ফসল নির্বাচন, সার ও সেচ পরিকল্পনা সবকিছু এক জায়গায়।",
  keywords: ["কৃষি", "AI", "IoT", "মাটির বিশ্লেষণ", "ফসল নির্বাচন", "সার পরিকল্পনা", "বাংলাদেশ", "কৃষক"],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌾</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${hindSiliguri.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}