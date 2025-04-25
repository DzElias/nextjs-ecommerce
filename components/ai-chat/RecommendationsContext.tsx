'use client';

import type { Product } from 'lib/bagisto/types';
import { createContext, useContext, useState, type ReactNode } from 'react';

interface RecommendationsContextType {
  products: Product[];
  updateProducts: (newProducts: Product[]) => void;
}

const RecommendationsContext = createContext<RecommendationsContextType | undefined>(undefined);

export function RecommendationsProvider({
  children,
  initialProducts = []
}: {
  children: ReactNode;
  initialProducts?: Product[];
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  return (
    <RecommendationsContext.Provider value={{ products, updateProducts }}>
      {children}
    </RecommendationsContext.Provider>
  );
}

export function useRecommendations() {
  const context = useContext(RecommendationsContext);
  if (context === undefined) {
    throw new Error('useRecommendations must be used within a RecommendationsProvider');
  }
  return context;
}
