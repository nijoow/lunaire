'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CartSheet } from './cart-sheet';

export const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/menu', label: 'Menu' },
    { href: '/order', label: 'Order' },
    { href: '/order/my-order', label: 'My Order' },
    { href: '/space', label: 'Space' },
    { href: '/events', label: 'Events' },
    { href: '/news', label: 'News' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="bg-background/70 sticky top-0 z-50 w-full border-b px-4 backdrop-blur md:px-6">
      <div className="flex h-14 w-full items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display flex w-[180px] items-center gap-2 text-lg"
        >
          <div className="relative aspect-[775/598] w-14">
            <Image src="/symbol.webp" alt="Cafe Lunaire logo" fill priority />
          </div>
          <span>Café Lunaire</span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="메인 내비게이션" className="hidden gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions + Mobile Nav */}
        <div className="flex items-center justify-end gap-2">
          <CartSheet />

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden cursor-pointer"
                aria-label="메뉴 열기"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="sr-only">메인 메뉴</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="모바일 내비게이션"
                className="mx-4 mt-8 flex flex-col gap-6"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="hover:text-primary text-lg font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
