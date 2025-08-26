type Params = {
  date: string; // '2025-08-13'
  start: string; // '18:00'
  end: string; // '21:30'
  headcount: number;
  options: { projector?: boolean; speaker?: boolean; private?: boolean };
};

const BASE_PER_HOUR = 40000; // 기본 1시간
const NIGHT_MULTIPLIER = 1.2; // 18:00~ 익일 06:00
const WEEKEND_MULTIPLIER = 1.15; // 토/일
const OPTION_COST = { projector: 10000, speaker: 8000, private: 15000 };
const EXTRA_PER_PERSON = 2000; // 기준 10인 초과 시 1인/시간당

export function computePrice(p: Params) {
  const s = new Date(`${p.date}T${p.start}:00`);
  const e = new Date(`${p.date}T${p.end}:00`);
  if (e <= s) throw new Error('invalid range');

  const hours = (e.getTime() - s.getTime()) / 36e5; // 소수 시간
  const isWeekend = [0, 6].includes(s.getDay());
  const isNight = s.getHours() >= 18 || s.getHours() < 6;

  const baseRaw = BASE_PER_HOUR * hours;
  const mult =
    (isWeekend ? WEEKEND_MULTIPLIER : 1) * (isNight ? NIGHT_MULTIPLIER : 1);
  const base = Math.round(baseRaw * mult);

  const headcountExtraHours =
    Math.max(0, p.headcount - 10) * EXTRA_PER_PERSON * hours;
  const options =
    (p.options.projector ? OPTION_COST.projector : 0) +
    (p.options.speaker ? OPTION_COST.speaker : 0) +
    (p.options.private ? OPTION_COST.private : 0);

  const surcharge = Math.round(base - baseRaw); // 가산분
  const total = Math.round(base + headcountExtraHours + options);

  return {
    hours,
    base,
    surcharge,
    headcount: Math.round(headcountExtraHours),
    options,
    total,
  };
}
