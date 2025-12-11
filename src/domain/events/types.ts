export type EventStatus = 'upcoming' | 'ongoing' | 'ended';

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string; // "2024. 10. 24" etc.
  time: string; // "19:00 - 21:00"
  location: string;
  thumbnailUrl: string; // /images/event-1.jpg
  status: EventStatus;
  ticketPrice?: number;
  ticketLink?: string;
};
