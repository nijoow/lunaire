"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EVENTS } from "@/domain/events/data";
import { Event } from "@/domain/events/types";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredEvents =
    activeTab === "all"
      ? EVENTS
      : activeTab === "upcoming"
      ? EVENTS.filter((e) => e.status === "upcoming" || e.status === "ongoing")
      : EVENTS.filter((e) => e.status === "ended");

  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <div className="flex flex-col gap-4 mb-12 text-center">
        <h1 className="text-4xl font-display font-bold">Events</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          루네르에서 열리는 다양한 문화 이벤트와 특별한 순간들을 확인하세요.
          <br />
          재즈 나이트부터 커피 커핑까지, 다채로운 경험이 기다리고 있습니다.
        </p>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full flex flex-col items-center gap-8"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="upcoming">진행 예정</TabsTrigger>
          <TabsTrigger value="ended">종료된 이벤트</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </Tabs>
    </main>
  );
}

function EventCard({ event }: { event: Event }) {
  const isEnded = event.status === "ended";

  return (
    <Card className={`overflow-hidden flex flex-col h-full ${isEnded ? "opacity-70 grayscale" : ""}`}>
      <div className="relative aspect-[4/3] w-full bg-muted">
        <Image
          src={event.thumbnailUrl}
          alt={event.title}
          fill
          className="object-cover transition-transform hover:scale-105 duration-500"
        />
        <div className="absolute top-4 left-4">
          <Badge
            variant={
              event.status === "upcoming"
                ? "default"
                : event.status === "ongoing"
                ? "destructive"
                : "secondary"
            }
          >
            {event.status === "upcoming"
              ? "Upcoming"
              : event.status === "ongoing"
              ? "Ongoing"
              : "Ended"}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="text-sm text-primary font-medium mb-1">{event.date}</div>
        <CardTitle className="text-xl leading-tight">{event.title}</CardTitle>
        <CardDescription className="line-clamp-2 mt-2">
          {event.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground flex-1">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isEnded ? "outline" : "default"} disabled={isEnded}>
          {isEnded ? "종료됨" : "자세히 보기"}
        </Button>
      </CardFooter>
    </Card>
  );
}
