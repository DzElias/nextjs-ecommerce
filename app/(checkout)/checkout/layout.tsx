import { Divider } from '@nextui-org/react';
import clsx from 'clsx';
import CartWrapper from 'components/checkout/cart/cart_wrapper';
import GiftBreadcrumb from 'components/checkout/gift-breadcrumb';
import Loading from 'components/checkout/loading';
import FormPlaceHolder from 'components/checkout/place-holder';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import type React from 'react';
import { Suspense } from 'react';

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-400 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';
const { SITE_NAME } = process.env;

export default async function CheckoutLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="flex min-h-[100dvh] flex-col-reverse justify-between lg:flex-row">
        <div className="flex-2 mx-auto w-full max-w-2xl flex-initial flex-shrink-0 flex-grow-0 gap-0 overflow-auto border-0 border-neutral-200 px-4 py-10 dark:border-gray-700 md:px-0 lg:basis-[55.5%] lg:border-r-[1px] lg:px-6">
          <div className="min-h-[100dvh] lg:min-h-[85dvh]">
            <Suspense
              fallback={
                <div className="flex h-[400px] w-full flex-row">
                  <div className={clsx(skeleton, activeAndTitles)} />
                  <div className={clsx(skeleton, items)} />
                  <div className={clsx(skeleton, items)} />
                  <div className={clsx(skeleton, items)} />
                </div>
              }
            >
              <header className="flex flex-col gap-4">
                <div className="hidden w-full flex-col gap-6 lg:flex">
                  <div>
                    <Link
                      className="flex items-center gap-2 text-black dark:text-white md:pt-1"
                      href="/"
                    >
                      <LogoSquare />
                      <span className="uppercase">{SITE_NAME}</span>
                    </Link>
                  </div>
                </div>
                <GiftBreadcrumb />
              </header>
            </Suspense>
            <Suspense fallback={<FormPlaceHolder />}>{children}</Suspense>
          </div>
          <Divider orientation="horizontal" className="dark:bg-gray-700" />
        </div>
        <div className="max-h-auto w-full flex-initial flex-shrink-0 flex-grow-0 lg:sticky lg:top-0 lg:max-h-[100dvh] lg:basis-[44.5%]">
          <Suspense fallback={<Loading />}>
            <CartWrapper />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
