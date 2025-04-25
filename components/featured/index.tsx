import { FeaturedGrid } from './grid';
import { FeaturedHeader } from './header';

export function Featured() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <FeaturedHeader />
      <FeaturedGrid />
    </section>
  );
}

export { FeaturedGrid } from './grid';
export { FeaturedHeader } from './header';
