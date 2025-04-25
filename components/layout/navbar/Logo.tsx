import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="group relative h-10 w-auto">
      <div className="overflow-hidden rounded-md">
        <Image
          src="/image/logo.png"
          alt="Logo"
          width={120}
          height={40}
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
    </Link>
  );
}
