import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-black shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-gray-900 dark:text-white dark:hover:border-neutral-600">
      <XMarkIcon className={clsx('h-6 transition-all ease-in-out hover:scale-110', className)} />
    </div>
  );
}
