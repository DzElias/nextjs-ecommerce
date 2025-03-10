
import AiGiftAssistant from "components/ai-gift-recommendation/aiGiftRecommendation";
import GiftSelection from "components/categories/GiftSelection";
import { FeaturedHeader } from "components/featured-header/featured-header";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import Navbar from "components/layout/navbar";

export const runtime = "edge";

export const metadata = {
  description: "High-performance ecommerce store built with Next.js, Vercel, and Bagisto.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const navbar = await Navbar();
  const threeItemGrid = await ThreeItemGrid();
  const giftSelection = await GiftSelection();
  const footer = await Footer();
  const featuredProducts = await FeaturedHeader();
  const aiRecommendationGift = await AiGiftAssistant();

  return (
    <>
      {navbar}
      {aiRecommendationGift}
      {giftSelection}
      {featuredProducts}
      {threeItemGrid}
      {footer}
    </>
  );
}
