import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'Take The Cake | Artisanal 3D Bakery & Patisserie (Coimbatore)',
  description:
    'Coimbatore’s premier artisanal bakery. Handcrafted gourmet cakes, interactive 3D custom cake configurator, and express midnight delivery.',
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
