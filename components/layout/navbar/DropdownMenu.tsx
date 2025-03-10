import Link from 'next/link';

interface DropdownMenuProps {
  items: { title: string; path: string }[];
}

export default function DropdownMenu({ items }: DropdownMenuProps) {
  return (
    <div className="relative group">
      {/* Botón del dropdown */}
      

      {/* Contenedor del menú */}
      <ul className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md opacity-0 invisible pointer-events-none 
                     group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-opacity duration-200">
        {items.map((item) => (
          <li key={item.path} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
            <Link href={`/search?category=${encodeURIComponent(item.title)}`} className="text-gray-800 no-underline hover:text-purple-600 block">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
