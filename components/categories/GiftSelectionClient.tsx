'use client';

import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Opciones estáticas para filtrar en la búsqueda
const staticCategories = [
  {
    id: '1',
    name: 'Hombre',
    path: '#', // Se actualizará posteriormente
    logoPath: '/images/hombre.jpg'
  },
  {
    id: '2',
    name: 'Mujer',
    path: '#', // Se actualizará posteriormente
    logoPath: '/images/mujer.jpg'
  },
  {
    id: '3',
    name: 'Niño',
    path: '#', // Se actualizará posteriormente
    logoPath: '/images/nino.jpg'
  },
  {
    id: '4',
    name: 'Niña',
    path: '#', // Se actualizará posteriormente
    logoPath: '/images/nina.jpg'
  },
  {
    id: '5',
    name: 'Adolescente',
    path: '#', // Se actualizará posteriormente
    logoPath: '/images/adolescente.jpg'
  }
];

export default function GiftSelectionClient() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10 flex flex-col items-center">
        <h2 className="relative text-center text-2xl font-bold text-purple-700 dark:text-white">
          ¿A quién quieres regalar?
          <span className="absolute bottom-0 left-1/2 -mb-2 h-0.5 w-32 -translate-x-1/2 transform bg-purple-400"></span>
        </h2>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 }
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-purple-600',
          bulletClass: 'swiper-pagination-bullet !bg-purple-200 !opacity-70'
        }}
        className="mt-6 w-full pb-12"
      >
        {staticCategories.map((category) => (
          <SwiperSlide key={category.id} className="flex justify-center py-4">
            <Link href={category.path} passHref>
              <div className="group relative w-[120px] cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-lg md:w-[150px]">
                <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-gray-50">
                  <Image
                    src={category.logoPath || '/placeholder.svg?height=150&width=150'}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="bg-white px-2 py-3 text-center font-medium text-gray-800 transition-colors duration-300 group-hover:text-purple-700">
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
