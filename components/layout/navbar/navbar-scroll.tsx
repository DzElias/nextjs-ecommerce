'use client';

import { useEffect } from 'react';

export default function NavbarScroll() {
  useEffect(() => {
    const navbar = document.getElementById('main-navbar');

    const handleScroll = () => {
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add('shadow-xl');
          navbar.classList.remove('shadow-lg');
        } else {
          navbar.classList.remove('shadow-xl');
          navbar.classList.add('shadow-lg');
        }
      }
    };

    // Añadir el event listener
    window.addEventListener('scroll', handleScroll);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Este componente no renderiza nada visible
  return null;
}
