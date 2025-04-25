import HowItWorksButton from './HowItWorksButton';
import TextInput from './TextInput';
import TitleSection from './TitleSection';

export default function AiGiftRecommendation() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12 text-center">
      <TitleSection />
      <div className="flex flex-col items-center gap-6 rounded-2xl border border-purple-100 bg-white p-8 shadow-xl md:flex-row">
        {/* Sección de texto y formulario */}
        <div className="flex-1">
          <h2 className="mb-2 text-2xl font-bold text-purple-800">¿No sabes qué regalar?</h2>
          <p className="mx-auto max-w-lg py-4 text-gray-600">
            Conta más: ¿Para quién es el regalo? ¿Qué edad tiene? ¿Cuánto querés gastar?
          </p>
          <TextInput />
        </div>

        {/* Sección del asistente con imagen más grande y botón abajo */}
        <div className="flex flex-col items-center md:ml-4">
          <div className="group relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-300 opacity-30 blur-md transition duration-300 group-hover:opacity-50"></div>
            <div className="relative">
              <img
                src="/image/image.png"
                alt="Asistente virtual"
                className="h-auto w-44 rounded-full bg-purple-50 object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
          <HowItWorksButton />
        </div>
      </div>
    </section>
  );
}
