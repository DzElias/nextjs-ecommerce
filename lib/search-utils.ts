import { getProducts } from 'lib/bagisto';

export async function getFilteredProducts({
  sortKey,
  reverse,
  query,
  filters
}: {
  sortKey?: string;
  reverse?: boolean;
  query?: string;
  filters?: { [key: string]: string | string[] | undefined };
}) {
  try {
    // Preparar los parámetros para la API de Bagisto
    const apiParams: Record<string, string> = {};

    // Añadir parámetros de búsqueda
    if (query) {
      apiParams.search = query;
    }

    // Añadir parámetros de ordenamiento
    if (sortKey) {
      apiParams.sort = sortKey;
      if (reverse) {
        apiParams.order = 'desc';
      } else {
        apiParams.order = 'asc';
      }
    }

    // Añadir parámetros de filtro
    if (filters) {
      // Filtrar parámetros que no son filtros
      const filterParams = { ...filters };
      delete filterParams.q;
      delete filterParams.sort;
      delete filterParams.page;

      // Añadir cada filtro a los parámetros de la API
      Object.entries(filterParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Si hay múltiples valores, unirlos con comas
          apiParams[`filter[${key}]`] = value.join(',');
        } else if (value) {
          apiParams[`filter[${key}]`] = value;
        }
      });
    }

    // Construir la URL con los parámetros
    const queryString = new URLSearchParams(apiParams).toString();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/products${
      queryString ? `?${queryString}` : ''
    }`;

    // Realizar la petición a la API
    const response = await fetch(apiUrl, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status}`);
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error al obtener productos filtrados:', error);

    // En caso de error, intentar obtener productos sin filtros
    try {
      return await getProducts({ sortKey, reverse, query });
    } catch (innerError) {
      console.error('Error al obtener productos sin filtros:', innerError);
      return []; // Devolver array vacío en caso de error
    }
  }
}
