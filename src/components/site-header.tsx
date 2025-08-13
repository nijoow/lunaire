"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export function SiteHeader() {
  const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/order", label: "Order" },
    { href: "/space", label: "Space" },
    { href: "/events", label: "Events" },
    { href: "/news", label: "News" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur px-4 md:px-6">
      <div className="w-full flex h-14 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg items-center flex gap-2 w-[180px]"
        >
          <div className="aspect-[775/598] w-14 relative">
            <Image src="/symbol.webp" alt="Cafe Lunaire logo" fill priority />
          </div>
          <span>Café Lunaire</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-6 md:flex text-sm">
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
        <div className="flex items-center gap-2 justify-end">
          <Link href="/reserve" className="hidden w-[180px] md:flex">
            <Button size="sm" variant="outline" className="ml-auto rounded-xl">
              Book Now
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle />
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-6 mx-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-6 mx-4 my-3">
                <Link href="/reserve">
                  <Button className="w-full rounded-xl">Book Now</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
