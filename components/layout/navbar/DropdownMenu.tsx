import Link from 'next/link';

interface DropdownMenuProps {
  items: { title: string; path: string }[];
}

export default function DropdownMenu({ items }: DropdownMenuProps) {
  return (
    <div className="group relative">
      {/* Contenedor del menú */}
      <ul
        className="pointer-events-none invisible absolute left-0 top-full z-50 mt-1 w-56 transform 
                   overflow-hidden rounded-lg border border-purple-100
                   bg-white opacity-0 shadow-xl transition-all duration-200
                   ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-1 group-hover:opacity-100"
      >
        {items.map((item) => (
          <li key={item.path} className="border-b border-purple-50 last:border-b-0">
            <Link
              href={item.path}
              className="block px-5 py-3 text-sm text-gray-700 no-underline transition-colors duration-150 hover:bg-purple-50 hover:text-purple-700"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
