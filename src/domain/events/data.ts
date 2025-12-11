import { Event } from './types';

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Lunaire Jazz Night: Summer Breeze',
    description: '한여름 밤의 꿈처럼 달콤한 재즈 선율과 함께하는 특별한 저녁.',
    date: '2025. 07. 15',
    time: '19:30 - 21:30',
    location: 'Lunaire Main Hall',
    thumbnailUrl: '/images/events/jazz-night.png',
    status: 'upcoming',
    ticketPrice: 35000,
  },
  {
    id: 'e2',
    title: 'Coffee Cupping with Barista Kim',
    description:
      '스페셜티 커피의 세계로 여러분을 초대합니다. 다양한 원두의 향미를 경험해보세요.',
    date: '2025. 06. 20',
    time: '14:00 - 16:00',
    location: 'Lunaire Brew Lab',
    thumbnailUrl: '/images/events/coffee-cupping.png',
    status: 'ongoing',
  },
  {
    id: 'e3',
    title: 'Spring Wine Tasting',
    description: '봄의 시작을 알리는 로제 와인과 가벼운 핑거푸드 페어링.',
    date: '2025. 04. 05',
    time: '18:00 - 20:00',
    location: 'Lunaire Rooftop',
    thumbnailUrl: '/images/events/wine-tasting.png',
    status: 'ended',
  },
];
