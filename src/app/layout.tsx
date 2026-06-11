import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GigPad Hub – Your Digital Songbook for Every Performance",
  description: "Official website for the GigPad Android App. Manage song lyrics, detect & transpose chords, organize setlists, and perform offline with a professional, free tool.",
  keywords: "GigPad, chord transposer, chordpro reader, lyrics viewer, worship team setlist, music app android, apk download",
  openGraph: {
    title: "GigPad Hub – Your Digital Songbook for Every Performance",
    description: "Manage songs, transpose chords instantly, and perform offline with GigPad. Get the latest free Android APK.",
    type: "website",
    url: "https://gigpad-hub.vercel.app", // standard production placeholder
    siteName: "GigPad Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "GigPad Hub – Your Digital Songbook for Every Performance",
    description: "Manage songs, transpose chords, and view lyrics offline on Android.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
