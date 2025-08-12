export type Period = "day" | "night";
export type Category =
  | "coffee"
  | "non-coffee"
  | "brunch"
  | "cocktail"
  | "wine"
  | "etc";

export type MenuItem = {
  id: string;
  name: string;
  note?: string;
  price: number;
  period: Period;
  category: Category;
  signature?: boolean;
  isNew?: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
  // Day
  {
    id: "m1",
    name: "Lunaire Latte",
    note: "바닐라, 달빛 폼",
    price: 6200,
    period: "day",
    category: "coffee",
    signature: true,
  },
  {
    id: "m2",
    name: "Aurora Cold Brew",
    note: "시트러스, 플로럴",
    price: 5800,
    period: "day",
    category: "coffee",
  },
  {
    id: "m3",
    name: "Citrus Ade",
    note: "상큼한 제철 과일",
    price: 5800,
    period: "day",
    category: "non-coffee",
    isNew: true,
  },
  {
    id: "m4",
    name: "Croissant",
    note: "버터 향 가득",
    price: 4200,
    period: "day",
    category: "brunch",
  },

  // Night
  {
    id: "m5",
    name: "Espresso Martini",
    note: "밤을 마시는 한 잔",
    price: 11000,
    period: "night",
    category: "cocktail",
    signature: true,
  },
  {
    id: "m6",
    name: "Moonlight Highball",
    note: "라이트 스모키",
    price: 9800,
    period: "night",
    category: "cocktail",
  },
  {
    id: "m7",
    name: "House Red",
    note: "미디엄 바디",
    price: 12000,
    period: "night",
    category: "wine",
  },
  {
    id: "m8",
    name: "Cheese Plate",
    note: "와인과 페어링",
    price: 9000,
    period: "night",
    category: "etc",
  },
];

export const CATEGORY_OPTIONS: Record<
  Period,
  { label: string; value: Category }[]
> = {
  day: [
    { label: "All", value: "coffee" }, // UI에선 All 처리
    { label: "Coffee", value: "coffee" },
    { label: "Non‑Coffee", value: "non-coffee" },
    { label: "Brunch", value: "brunch" },
  ],
  night: [
    { label: "All", value: "cocktail" }, // UI에선 All 처리
    { label: "Cocktail", value: "cocktail" },
    { label: "Wine", value: "wine" },
    { label: "Etc", value: "etc" },
  ],
};
