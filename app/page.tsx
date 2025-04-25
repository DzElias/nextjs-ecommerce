import AiGiftAssistant from 'components/ai-gift-recommendation/aiGiftRecommendation';
import GiftSelection from 'components/categories/GiftSelection';
import { Featured } from 'components/featured';
import { ThreeItemGrid } from 'components/grid/three-items';
import HowItWorks from 'components/how-it-works';
import Navbar from 'components/layout/navbar';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Bagisto.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const navbar = await Navbar();
  const threeItemGrid = await ThreeItemGrid();
  const giftSelection = await GiftSelection();
  const aiRecommendationGift = AiGiftAssistant();

  return (
    <>
      {navbar}
      {aiRecommendationGift}
      {giftSelection}
      <Featured />
      <HowItWorks />
      {threeItemGrid}
    </>
  );
}
