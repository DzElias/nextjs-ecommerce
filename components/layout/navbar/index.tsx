import Cart from 'components/cart';
import Logo from './Logo';
import NavbarScroll from './navbar-scroll';
import Search from './search';

export default async function Navbar() {
  return (
    <>
      {/* Navbar fijo */}
      <nav
        className="fixed left-0 right-0 top-0 z-50 bg-gradient-to-r from-purple-800 via-purple-700 to-purple-900 px-6 py-4 text-white shadow-lg transition-shadow duration-300"
        id="main-navbar"
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <Logo />
          </div>

          {/* Área de búsqueda y carrito */}
          <div className="flex items-center space-x-6">
            <Search />
            <Cart />
          </div>
        </div>
      </nav>

      {/* Espacio para compensar el navbar fijo */}
      <div className="h-20"></div>

      {/* Script para manejar el comportamiento de desplazamiento */}
      <NavbarScroll />
    </>
  );
}
