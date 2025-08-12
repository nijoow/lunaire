// components/home/signature-grid.tsx
type Item = {
  id: string;
  name: string;
  note: string;
  price: number;
  period: "day" | "night";
  image?: string;
  signature?: boolean;
};

const ITEMS: Item[] = [
  {
    id: "sig1",
    name: "Lunaire Latte",
    note: "달빛 폼, 바닐라 노트",
    price: 6200,
    period: "day",
    signature: true,
  },
  {
    id: "sig2",
    name: "Aurora Cold Brew",
    note: "시트러스 & 플로럴",
    price: 5800,
    period: "day",
    signature: true,
  },
  {
    id: "sig3",
    name: "Espresso Martini",
    note: "밤을 마시는 한 잔",
    price: 11000,
    period: "night",
    signature: true,
  },
  {
    id: "sig4",
    name: "Moonlight Highball",
    note: "라이트 스모키, 상큼한 피니시",
    price: 9800,
    period: "night",
    signature: true,
  },
];

export function SignatureGrid() {
  return (
    <section className="container py-14">
      <h2 className="font-display text-3xl">Signatures</h2>
      <p className="mt-2 text-muted-foreground">
        낮과 밤을 대표하는 시그니처 4선
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => (
          <article
            key={item.id}
            className="group rounded-2xl bg-card p-5 text-card-foreground shadow-card transition hover:shadow-cardDark"
          >
            <div
              className="aspect-video w-full rounded-xl bg-muted/40"
              aria-hidden
            />
            <div className="mt-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              {item.signature && (
                <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                  Signature
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
            <div className="mt-3 text-sm">
              {item.period === "day" ? "Day" : "Night"} · ₩
              {item.price.toLocaleString()}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
