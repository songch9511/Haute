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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
