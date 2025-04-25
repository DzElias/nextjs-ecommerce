'use client';

import {
  ChatBubbleLeftIcon,
  GiftIcon,
  LightBulbIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const steps = [
  {
    title: 'Pide consejos a nuestra IA',
    description:
      '¿No sabes qué regalar? Nuestra inteligencia artificial te ayudará a encontrar el regalo perfecto según los gustos, edad y preferencias de la persona.',
    icon: LightBulbIcon,
    image: '/image/image.png'
  },
  {
    title: 'Elige el regalo ideal',
    description:
      'Selecciona entre nuestra amplia variedad de opciones cuidadosamente elegidas para cada ocasión, persona y presupuesto.',
    icon: GiftIcon,
    image: '/image/online-wishes.png'
  },
  {
    title: 'Comparte el WhatsApp',
    description:
      'Solo necesitamos el número de WhatsApp de la persona a quien quieres sorprender. No te preocupes por direcciones ni detalles adicionales.',
    icon: ChatBubbleLeftIcon,
    image: '/image/chat.png'
  },
  {
    title: 'Nosotros lo enviamos',
    description:
      'Nos encargamos de todo el proceso de entrega, desde el empaque especial hasta la coordinación con el destinatario. Tú solo espera su reacción.',
    icon: TruckIcon,
    image: '/image/delivery.png'
  }
];

export default function HowItWorks() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-white to-purple-50 py-16 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">¿Cómo funciona?</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Regalar nunca fue tan fácil y sin complicaciones
          </p>
        </div>

        {isMobile ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-purple-600',
              bulletClass: 'swiper-pagination-bullet !bg-purple-200 !opacity-70'
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            className="w-full pb-12"
          >
            {steps.map((step, index) => (
              <SwiperSlide key={index} className="h-auto">
                <StepCard step={step} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid auto-rows-fr gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const Icon = step.icon;

  return (
    <div className="group relative h-full">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-300 opacity-20 blur transition duration-300 group-hover:opacity-30" />
      <div className="relative flex h-full flex-col rounded-xl bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-1 dark:bg-gray-800">
        <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={step.image || '/placeholder.svg'}
            alt={step.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <Icon className="h-5 w-5 text-purple-600 dark:text-purple-300" />
          </div>
          <span className="text-sm font-medium text-purple-600 dark:text-purple-300">
            Paso {index + 1}
          </span>
        </div>
        <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
        <p className="flex-grow text-gray-600 dark:text-gray-300">{step.description}</p>
      </div>
    </div>
  );
}
