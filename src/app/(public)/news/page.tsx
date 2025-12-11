"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NEWS_ITEMS } from "@/domain/news/data";
import { NewsCategory, NewsItem } from "@/domain/news/types";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function NewsPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <div className="flex flex-col gap-4 mb-16 text-center">
        <h1 className="text-4xl font-display font-bold">Newsroom</h1>
        <p className="text-muted-foreground">
          루네르의 새로운 소식과 공지사항을 전해드립니다.
        </p>
      </div>

      <div className="space-y-6">
        {NEWS_ITEMS.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Button variant="outline" className="gap-2">
          더 많은 소식 보기 <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </main>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="group transition-colors hover:bg-muted/30">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <CategoryBadge category={item.category} />
            <span className="text-sm text-muted-foreground">{item.date}</span>
          </div>
          <CardTitle className="text-xl">{item.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            {isExpanded ? item.content : item.excerpt}
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-auto p-0 text-primary hover:text-primary/80"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "접기" : "자세히 보기"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryBadge({ category }: { category: NewsCategory }) {
  const styles = {
    notice: "bg-blue-100 text-blue-700 hover:bg-blue-100",
    promotion: "bg-rose-100 text-rose-700 hover:bg-rose-100",
    update: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  };

  const labels = {
    notice: "공지",
    promotion: "이벤트",
    update: "업데이트",
  };

  return (
    <Badge variant="secondary" className={`${styles[category]} border-none`}>
      {labels[category]}
    </Badge>
  );
}
