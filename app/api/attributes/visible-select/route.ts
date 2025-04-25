// app/api/attributes/visible-select/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const BAGISTO_DOMAIN = process.env.BAGISTO_STORE_DOMAIN;

  try {
    // 1. Validación de variables de entorno
    if (!BAGISTO_DOMAIN) {
      throw new Error('Configuración de Bagisto incompleta en variables de entorno');
    }

    // 2. Construcción de la URL con validación
    const graphqlEndpoint = BAGISTO_DOMAIN.startsWith('http')
      ? `${BAGISTO_DOMAIN}/graphql`
      : `https://${BAGISTO_DOMAIN}/graphql`;

    // 3. Consulta GraphQL simplificada y validada
    const query = `
      query attributes {
        attributes(
          page: 1
          input: {
            type: "select"
          }
        ) {
          paginatorInfo {
            count
            currentPage
            lastPage
            total
          }
          data {
            id
            code
            adminName
            type
            position
            isRequired
            isUnique
            validation
            valuePerLocale
            valuePerChannel
            isFilterable
            isConfigurable
            isVisibleOnFront
            isUserDefined
            swatchType
            isComparable
            options {
              id
              adminName
              swatchValue
              attributeId
              attribute {
                id
                adminName
              }
              translations {
                id
                locale
                label
                attributeOptionId
              }
            }
            translations {
              id
              locale
              name
              attributeId
            }
          }
        }
      }
    `;
    // 4. Configuración robusta de la petición
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ query }),
      cache: 'no-store' // Evitar caché para desarrollo
    });

    // 5. Manejo detallado de errores HTTP
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    // 6. Validación de errores GraphQL
    if (result.errors) {
      const graphqlError = result.errors[0];
      throw new Error(`GraphQL Error: ${graphqlError.message}`);
    }

    // 7. Procesamiento seguro de datos
    const attributes = result.data?.attributes?.data || [];
    const visibleAttributes = attributes.filter((attr: any) => attr.isVisibleOnFront);

    return NextResponse.json({
      success: true,
      data: visibleAttributes,
      count: visibleAttributes.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error detallado:', error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        count: 0,
        error: error instanceof Error ? error.message : 'Error desconocido',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
