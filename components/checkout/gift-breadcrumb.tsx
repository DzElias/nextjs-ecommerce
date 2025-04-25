'use client';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react';
import { isObject } from 'lib/type-guards';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type BreadCumbType = {
  label: 'Destinatario' | 'WhatsApp' | 'Tarjeta' | 'Confirmación' | 'Pago';
  href: string;
};

type BreadcrumbArray = BreadCumbType[];

const breadCrumbs: BreadcrumbArray = new Array(
  {
    label: 'Destinatario',
    href: '/checkout/recipient'
  },
  {
    label: 'WhatsApp',
    href: '/checkout/whatsapp'
  },
  {
    label: 'Tarjeta',
    href: '/checkout/card'
  },
  {
    label: 'Confirmación',
    href: '/checkout/confirmation'
  },
  {
    label: 'Pago',
    href: '/checkout/payment'
  }
);

const GiftBreadcrumb = () => {
  const paths = usePathname();
  const [currentPage, setCurrentPage] = useState<BreadCumbType['label']>('Destinatario');
  const currentPath = breadCrumbs?.find((item) => item.href === paths);

  useEffect(() => {
    if (isObject(currentPath)) {
      setCurrentPage(currentPath.label);
    }
  }, [paths, currentPath]);

  let recipientPassed = false;
  const BreadCrumbsArray: BreadcrumbArray = breadCrumbs.map((crumb) => {
    if (crumb.href === paths) {
      recipientPassed = true;
      return { ...crumb, href: paths };
    } else if (recipientPassed) {
      return { ...crumb, href: '#' };
    } else {
      return { ...crumb };
    }
  });

  return (
    <Breadcrumbs
      onAction={(value: any) => setCurrentPage(value)}
      color="success"
      classNames={{
        list: 'gap-0'
      }}
      size="md"
      itemClasses={{
        item: [
          'px-1 py-0.5 text-gray-700',
          'data-[current=true]:border-foreground data-[disabled=true]:text-purple-500 data-[current=true]:text-black dark:data-[current=true]:text-white data-[current=true]:font-semibold'
        ],
        separator: 'block text-gray-500 dark:text-white'
      }}
    >
      {BreadCrumbsArray.map((item) => (
        <BreadcrumbItem
          key={item.label}
          isDisabled={item?.href === '#'}
          isCurrent={currentPage === item.label}
        >
          <Link href={item.href}>{item.label}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default GiftBreadcrumb;
