import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedItem {
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  layout: 'large' | 'medium' | 'wide';
  className?: string;
}

function FeaturedCard({ item }: { item: FeaturedItem }) {
  const layoutClasses = {
    large: 'col-span-2 row-span-2 md:col-span-2 md:row-span-2',
    medium: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
    wide: 'col-span-2 row-span-1 md:col-span-2 md:row-span-1'
  };

  return (
    <Link
      href={item.href}
      className={clsx(
        'group relative overflow-hidden rounded-2xl',
        layoutClasses[item.layout],
        item.className
      )}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 to-black/5" />
      <Image
        src={item.image || '/placeholder.svg'}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes={
          item.layout === 'large'
            ? '(min-width: 768px) 50vw, 100vw'
            : '(min-width: 768px) 25vw, 50vw'
        }
      />
      <div className="relative z-20 flex h-full flex-col justify-between p-6">
        {item.subtitle && (
          <span className="self-start rounded-full bg-purple-600/90 px-3 py-1 text-sm font-medium text-white/90">
            {item.subtitle}
          </span>
        )}
        <h3 className="mt-auto text-2xl font-bold text-white drop-shadow-sm">{item.title}</h3>
      </div>
    </Link>
  );
}

export function FeaturedGrid() {
  const featuredItems: FeaturedItem[] = [
    {
      title: 'Día de la Mujer',
      subtitle: 'Novedad',
      image: '/image/womans-day.png',
      href: '/search?category=womens-day',
      layout: 'large'
    },
    {
      title: '15 años',
      subtitle: 'Regalo para',
      image: '/image/15years.png',
      href: '/search?category=15-years',
      layout: 'medium'
    },
    {
      title: 'Creativos',
      subtitle: 'Regalos',
      image: '/image/creative.png',
      href: '/search?category=creative',
      layout: 'medium'
    },
    {
      title: 'Mujer de 30 Años',
      subtitle: 'Regalo para',
      image: '/image/30years-woman.png',
      href: '/search?category=30-year-woman',
      layout: 'medium'
    },
    {
      title: 'Aniversario',
      subtitle: 'Regalo de',
      image: '/image/anniversary.png',
      href: '/search?category=anniversary',
      layout: 'medium'
    },
    {
      title: 'Amiga',
      subtitle: 'Regalo para',
      image: '/image/friend.png',
      href: '/search?category=friend',
      layout: 'wide',
      className: 'md:col-start-3 md:col-span-2'
    }
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-6 pb-12">
      <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
        {featuredItems.map((item, index) => (
          <FeaturedCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
