import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Obtener el precio formateado directamente de la respuesta de la API
  const getPrice = () => {
    // Si existe priceHtml y formattedFinalPrice, usarlo directamente
    if (product.priceHtml && product.priceHtml.formattedFinalPrice) {
      return product.priceHtml.formattedFinalPrice;
    }

    // Si existe priceHtml y formattedRegularPrice, usarlo como alternativa
    if (product.priceHtml && product.priceHtml.formattedRegularPrice) {
      return product.priceHtml.formattedRegularPrice;
    }

    // Si existe finalPrice o regularPrice, formatearlo manualmente
    if (product.priceHtml && (product.priceHtml.finalPrice || product.priceHtml.regularPrice)) {
      const price = product.priceHtml.finalPrice || product.priceHtml.regularPrice;
      const currencyCode = product.priceHtml.currencyCode || 'PYG';

      // Formatear el número manualmente para guaraníes
      if (currencyCode === 'PYG') {
        return new Intl.NumberFormat('es-PY', {
          style: 'currency',
          currency: 'PYG',
          maximumFractionDigits: 0
        }).format(Number(price));
      }

      // Para otras monedas
      return new Intl.NumberFormat('es', {
        style: 'currency',
        currency: currencyCode
      }).format(Number(price));
    }

    // Si no hay información de precio disponible
    return 'Precio no disponible';
  };

  // Obtener la URL de la imagen principal o usar una imagen de placeholder
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].url
      : `/placeholder.svg?height=400&width=400`;

  // Construir la URL del producto
  const productUrl = `/product/${product.urlKey || product.id}`;

  return (
    <Link href={productUrl} className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={product.name || 'Producto'}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          width={400}
          height={400}
        />
      </div>
      <div className="mt-3">
        <h3 className="text-sm font-medium text-gray-900 transition-colors group-hover:text-purple-700">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-purple-700">{getPrice()}</p>
      </div>
    </Link>
  );
}
