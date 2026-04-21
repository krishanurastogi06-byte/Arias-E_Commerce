import HeroBanner from '@/components/home/HeroBanner';
import Categories from '@/components/home/Categories';
import BrandSection from '@/components/home/BrandSection';
import NewArrivals from '@/components/home/NewArrivals';
import PopularProducts from '@/components/home/PopularProducts';
import CTASection from '@/components/home/CTASection';

export const metadata = {
  title: 'ARIA | Premium Female Fashion Boutique',
  description: 'Experience luxury and elegance with ARIA’s curated collection of female apparel, from evening gowns to everyday essentials.',
};

export default function Home() {
  return (
    <main className="min-h-screen pt-20">
      <HeroBanner />
      <Categories />
      <BrandSection />
      <NewArrivals />
      <PopularProducts />
      <CTASection />
    </main>
  );
}
