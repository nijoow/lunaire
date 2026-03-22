'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCart } from '@/stores/cart';
import { Minus, Plus, ShoppingBag, ShoppingCart, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const CartSheet = () => {
  const { items, updateQuantity, clear, subtotal } = useCart();
  const [open, setOpen] = useState(false);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full cursor-pointer">
          <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          {totalCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold">
              {totalCount}
            </span>
          )}
          <span className="sr-only">장바구니 ({totalCount}개)</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            장바구니
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
              <ShoppingBag className="text-muted-foreground h-10 w-10 opacity-30" aria-hidden="true" />
            </div>
            <p className="text-muted-foreground text-sm">
              장바구니가 비어 있습니다.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="mt-6 flex-1 px-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cartKey}
                    className="flex flex-col gap-3 rounded-2xl border p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-1">
                        <h4 className="leading-none font-semibold">
                          {item.name}
                        </h4>
                        {item.optionLabel && (
                          <p className="text-muted-foreground text-xs">
                            {item.optionLabel}
                          </p>
                        )}
                        <p className="text-muted-foreground text-sm">
                          ₩{item.price.toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`${item.name} 삭제`}
                        className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-full cursor-pointer"
                        onClick={() => updateQuantity(item.cartKey, 0)}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>

                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-primary font-medium">
                        ₩{(item.price * item.quantity).toLocaleString()}
                      </p>
                      <div className="bg-muted/50 flex items-center rounded-full border">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="수량 감소"
                          className="hover:bg-accent h-8 w-8 rounded-full cursor-pointer"
                          onClick={() =>
                            updateQuantity(item.cartKey, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium" aria-live="polite">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="수량 증가"
                          className="hover:bg-accent h-8 w-8 rounded-full cursor-pointer"
                          onClick={() =>
                            updateQuantity(item.cartKey, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-auto space-y-4 pt-6">
              <Separator />
              <div className="flex items-center justify-between px-4 text-lg font-bold">
                <span>총 결제 금액</span>
                <span className="text-primary">
                  ₩{subtotal().toLocaleString()}
                </span>
              </div>
              <SheetFooter className="flex-col gap-3 sm:flex-col">
                <Button
                  asChild
                  className="w-full rounded-xl py-6 text-base cursor-pointer"
                  size="lg"
                >
                  <Link href="/order/checkout" onClick={() => setOpen(false)}>
                    주문하기
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="text-muted-foreground w-full text-xs hover:bg-transparent hover:underline cursor-pointer"
                  onClick={clear}
                >
                  장바구니 비우기
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
