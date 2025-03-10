import Cart from 'components/cart';
import Link from 'next/link';
import DropdownMenu from './DropdownMenu';
import Logo from './Logo';
import menuData from './menuData';
import Search from './search';

export default function Navbar() {
  return (
    <nav className="bg-purple-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Menú principal */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          {menuData.map((menu) => (
            <li key={menu.title} className="relative group">
              <span className="cursor-pointer hover:text-gray-300">{menu.title}</span>
              {menu.subcategories && <DropdownMenu items={menu.subcategories} />}
            </li>
          ))}
        </ul>

        {/* Área de búsqueda y carrito */}
        <div className="flex items-center space-x-4">
          <Search />
          <Cart />
        </div>
      </div>
    </nav>
  );
}
