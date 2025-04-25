import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number | string;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-purple-800 hover:shadow-purple-200 active:scale-95 dark:hover:shadow-purple-900/30">
      <ShoppingCartIcon
        className={clsx('h-5 w-5 transition-all duration-300 ease-in-out', className)}
        aria-hidden="true"
      />

      {quantity ? (
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-purple-700 shadow-md ring-2 ring-purple-600">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
