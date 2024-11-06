import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Typing Speed Test',
  description: 'Test your typing speed in English!',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
);

export default RootLayout;
