import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dimension Cloud — 2D to 3D in Seconds",
  description:
    "Upload 2D engineering drawings. AI generates precise 3D models. Edit via chat. Export STEP, GLB, STL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,400;1,9..144,500;1,9..144,600;1,9..144,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-cormorant: "Fraunces", "Cormorant Garamond", Georgia, serif;
            --font-serif-display: "Fraunces", Georgia, serif;
            --font-geist-sans: "Geist", system-ui, sans-serif;
            --font-geist-mono: "Geist Mono", ui-monospace, "SF Mono", monospace;
          }
        `}</style>
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
