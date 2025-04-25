export default function Loading() {
  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="mt-6 space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="h-16 w-16 animate-pulse rounded-md bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
                <div className="flex justify-between">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200"></div>
                  <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="h-px w-full animate-pulse bg-gray-200"></div>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
          ))}
          <div className="h-px w-full animate-pulse bg-gray-200"></div>
          <div className="flex justify-between">
            <div className="h-5 w-16 animate-pulse rounded bg-gray-200"></div>
            <div className="h-5 w-20 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
