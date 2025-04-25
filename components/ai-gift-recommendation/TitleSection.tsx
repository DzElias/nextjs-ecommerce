export default function TitleSection() {
  return (
    <div className="mb-8 px-4 text-center">
      <h1 className="flex flex-wrap items-center justify-center gap-3 text-3xl font-extrabold tracking-tight text-purple-800 md:text-4xl">
        <span className="transform rounded-lg bg-gradient-to-r from-purple-700 to-purple-600 px-4 py-2 text-white shadow-md transition-transform duration-300 hover:scale-105">
          Envíe el regalo perfecto
        </span>
        <span className="text-purple-700">solo con el número de</span>
        <span className="font-extrabold" style={{ color: '#25D366' }}>
          WhatsApp
        </span>
      </h1>
    </div>
  );
}
