'use client';

import { fetchRecommendedProducts } from 'lib/fetchRecommendedProducts';
import Image from 'next/image';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRecommendations } from './RecommendationsContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiChatInterface({ initialQuery }: { initialQuery: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { updateProducts } = useRecommendations();

  // Inicializar el chat con la consulta inicial y una respuesta de bienvenida
  useEffect(() => {
    if (initialQuery) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content:
          '¡Hola! Soy tu asistente virtual. Voy a ayudarte a encontrar el regalo perfecto. Cuéntame más detalles sobre para quién es el regalo, sus gustos, edad, y cuánto quieres gastar.'
      };

      const userMessage: Message = {
        role: 'user',
        content: initialQuery
      };

      const assistantResponse: Message = {
        role: 'assistant',
        content: `Gracias por la información. Basado en lo que me has contado sobre "${initialQuery}", he seleccionado algunos productos que podrían ser perfectos. Puedes verlos en la sección de recomendaciones. ¿Hay algo más específico que estés buscando?`
      };

      setMessages([welcomeMessage, userMessage, assistantResponse]);
    }
  }, [initialQuery]);

  // Scroll al final de los mensajes cuando se añade uno nuevo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Obtener nuevas recomendaciones basadas en el mensaje del usuario
      const newProducts = await fetchRecommendedProducts(input);

      // Actualizar las recomendaciones en el contexto compartido
      updateProducts(newProducts);

      // Añadir respuesta del asistente
      const assistantMessage: Message = {
        role: 'assistant',
        content:
          'He actualizado las recomendaciones basadas en tu información. ¿Hay algo más en lo que pueda ayudarte?'
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);

      const errorMessage: Message = {
        role: 'assistant',
        content:
          'Lo siento, tuve un problema al procesar tu solicitud. ¿Podrías intentarlo de nuevo?'
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-lg">
      {/* Encabezado del chat */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold">Asistente de Regalos</h2>
            <p className="text-xs text-white/80">Te ayudaré a encontrar el regalo perfecto</p>
          </div>
        </div>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-purple-100">
                <Image
                  src="/image/image.png"
                  alt="Assistant"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.role === 'user'
                  ? 'rounded-tr-none bg-purple-600 text-white'
                  : 'rounded-tl-none border border-gray-200 bg-white text-gray-800'
              }`}
            >
              {message.content}
            </div>
            {message.role === 'user' && (
              <div className="ml-2 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="mb-4 flex justify-start">
            <div className="mr-2 h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-purple-100">
              <Image
                src="/image/image.png"
                alt="Assistant"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <div className="rounded-2xl rounded-tl-none border border-gray-200 bg-white px-4 py-2">
              <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400 delay-100"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-purple-400 delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulario de entrada */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-3">
        <div className="flex overflow-hidden rounded-full border border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-300">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 px-4 py-2 text-white disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
