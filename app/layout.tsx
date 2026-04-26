import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Porsche 356 A | The Legend of 1955",
  description: "Experience the heritage of the iconic Porsche 356 A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
