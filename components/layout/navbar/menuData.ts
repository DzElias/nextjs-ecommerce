const menuData = [
  {
    title: 'Profesión',
    subcategories: [
      { title: 'Médico', path: '/search?category=medico' },
      { title: 'Ingeniero', path: '/search?category=ingeniero' },
      { title: 'Profesor', path: '/search?category=profesor' },
      { title: 'Abogado', path: '/search?category=abogado' }
    ]
  },
  {
    title: 'Conmemoración',
    subcategories: [
      { title: 'Cumpleaños', path: '/search?category=cumpleanos' },
      { title: 'Aniversario', path: '/search?category=aniversario' },
      { title: 'Graduación', path: '/search?category=graduacion' },
      { title: 'Navidad', path: '/search?category=navidad' }
    ]
  },
  {
    title: 'Persona',
    subcategories: [
      { title: 'Para Él', path: '/search?category=para-el' },
      { title: 'Para Ella', path: '/search?category=para-ella' },
      { title: 'Para Niños', path: '/search?category=para-ninos' },
      { title: 'Para Abuelos', path: '/search?category=para-abuelos' }
    ]
  }
];

export default menuData;
