export function FeaturedHeader() {
    return (
      <div className="w-full px-6 py-8"> {/* Aumenté el padding vertical y reduje el horizontal */}
        <div className="max-w-screen-md mx-auto flex items-center justify-between">
          {/* Sección de título */}
          <div className="flex items-center gap-2">
            <div className="bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
              Destacados
            </div>
            <h2 className="text-purple-600 text-2xl font-bold">Selecciones en tendencia</h2>
          </div>
  
          {/* Enlace a más productos */}
          <a
            href="/search?featured=true"
            className="text-purple-600 text-sm font-medium flex items-center gap-1 hover:underline"
          >
            Explorar regalos →
          </a>
        </div>
      </div>
    );
  }
  