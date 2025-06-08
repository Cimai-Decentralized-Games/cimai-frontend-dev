// import type { Metadata } from "next";
import "./globals.css";
// import { Crimson_Text } from 'next/font/google';

export const metadata = {
  title: 'Cimai',
  description: 'Casa de Cimai',
};

// const crimsonText = Crimson_Text({
//   subsets: ['latin'],
//   weight: ['400', '600', '700'],
//   style: ['normal', 'italic'],
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="business">
      <body>
        {/* We'll use a client component wrapper in each page instead */}
        {children}
      </body>
    </html>
  );
}
