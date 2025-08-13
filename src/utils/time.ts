import { Period } from '@/domain/types';

export function getCurrentPeriod(now = new Date()): Period {
  const h = now.getHours();
  return h >= 6 && h < 18 ? 'day' : 'night';
}
