import "./globals.css";
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import BottomNav from '@/components/common/BottomNav';
import { StoreProvider } from '@/context/StoreContext';

import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "ARIA | Premium Female Fashion Boutique",
  description: "Experience luxury and elegance with ARIA’s curated collection of female apparel, from evening gowns to everyday essentials.",
  icons: "/icon.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full selection:bg-accent-blush selection:text-black pb-16 lg:pb-0">
        <StoreProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <BottomNav />
        </StoreProvider>
      </body>
    </html>
  );
}
