export default function LoadingSpinner() {
  return (
    <div className="flex h-[600px] flex-col items-center justify-center rounded-2xl border border-purple-100 bg-white p-6 shadow-lg">
      <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"></div>
      <p className="font-medium text-gray-600">Cargando...</p>
    </div>
  );
}
