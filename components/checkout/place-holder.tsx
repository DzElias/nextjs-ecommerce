export default function FormPlaceHolder() {
  return (
    <div className="my-5 animate-pulse space-y-6">
      <div className="flex items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-gray-200 p-4"></div>
      </div>

      <div className="mx-auto h-8 w-3/4 rounded-lg bg-gray-200"></div>

      <div className="space-y-4">
        <div className="rounded-lg bg-gray-100 p-6">
          <div className="space-y-4">
            <div>
              <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="h-10 rounded bg-gray-200"></div>
            </div>

            <div>
              <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
              <div className="h-10 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        <div className="mx-auto h-4 w-3/4 rounded bg-gray-200"></div>

        <div className="flex justify-center">
          <div className="h-12 w-2/3 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
