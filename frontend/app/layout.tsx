import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "POD Trend Dashboard",
  description: "AI-driven print-on-demand trend & design automation dashboard"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="max-w-6xl mx-auto p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">POD Trend Dashboard</h1>
            <p className="text-slate-300 mt-1 text-sm">
              Explore marketplace trends, scores, and niches discovered by the backend.
            </p>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
