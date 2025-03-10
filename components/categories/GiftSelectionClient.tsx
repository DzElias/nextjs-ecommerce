"use client";

import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function GiftSelectionClient({ categories }: { categories: any[] }) {
  return (
    <div className="max-w-3xl mx-auto p-6"> {/* Se redujo el ancho máximo de la fila */}
      <h2 className="text-center text-lg font-semibold text-purple-600 dark:text-white">
        ¿A quién quieres regalar?
      </h2>

      {/* Swiper con menor espacio entre imágenes y deslizador en móviles */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={5} // Reduce espacio entre imágenes
        slidesPerView={5} // Muestra 5 en pantallas grandes
        breakpoints={{
          320: { slidesPerView: 3 }, // 2 imágenes en móviles
          640: { slidesPerView: 3 }, // 3 imágenes en tablets
          1024: { slidesPerView: 5 }, // 5 imágenes en escritorio
        }}
        pagination={{ clickable: true }}
        className="mt-4 w-full"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className="flex justify-center">
            <Link href={category.path} passHref>
              <div className="relative w-[90px] md:w-[130px] rounded-lg overflow-hidden shadow-lg border border-gray-200 cursor-pointer hover:shadow-md transition duration-200">
                {/* Imagen cuadrada */}
                <div className="w-full aspect-square flex items-center justify-center bg-gray-300">
                  <img
                    src={category.logoPath}
                    alt={category.name}
                    className="w-full h-auto object-contain"
                  />
                </div>

                {/* Título */}
                <div className="text-center py-2 text-gray-600 dark:text-white font-medium">
                  {category.name}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
