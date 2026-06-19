import type { Metadata } from 'next';
import { Poppins, Inter, Geist } from 'next/font/google';
import '@/style/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { cn } from "@/lib/utils";
import Navbar from '@/components/navigation/Navbar';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/navigation/Footer';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'CodeV-HEI | Software development by passionate students',
  description: 'Pôle de développement logiciel par des étudiants passionnés de l\'HEI.',
  icons: {
    icon: '/icon/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body
        className={`${poppins.className} ${inter.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
