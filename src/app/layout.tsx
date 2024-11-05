import { appWithTranslation } from 'next-i18next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Typing Speed Test',
  description: 'Test your typing speed in multiple languages!',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
);

export default appWithTranslation(RootLayout);
