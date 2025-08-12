// components/menu/menu-tabs.tsx
"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MenuCard } from "./menu-card";
import { CATEGORY_OPTIONS, MENU_ITEMS, Period, type Category } from "../_data";

export function MenuTabs() {
  const [period, setPeriod] = React.useState<"day" | "night">("day");
  const [category, setCategory] = React.useState<"all" | Category>("all");

  const categories = CATEGORY_OPTIONS[period];

  const filtered = MENU_ITEMS.filter((it) => {
    if (it.period !== period) return false;
    if (category === "all") return true;
    return it.category === category;
  });

  return (
    <Tabs
      value={period}
      onValueChange={(v) => setPeriod(v as Period)}
      className="mt-8"
    >
      <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="day" className="w-1/2 md:w-auto">
            Day
          </TabsTrigger>
          <TabsTrigger value="night" className="w-1/2 md:w-auto">
            Night
          </TabsTrigger>
        </TabsList>

        {/* 카테고리 셀렉트 */}
        <div className="flex items-center gap-3 ml-auto">
          <Select
            value={category}
            onValueChange={(v) => setCategory(v as Category)}
          >
            <SelectTrigger className="w-[180px] rounded-xl">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.slice(1).map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-4" />

      <TabsContent value="day" className="mt-0">
        <Grid items={filtered} />
      </TabsContent>

      <TabsContent value="night" className="mt-0">
        <Grid items={filtered} />
      </TabsContent>
    </Tabs>
  );
}

function Grid({ items }: { items: typeof MENU_ITEMS }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border p-10 text-center text-sm text-muted-foreground">
        표시할 메뉴가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
