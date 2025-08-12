import { MenuTabs } from "./_components/menu-tabs";

export default function MenuPage() {
  return (
    <main className="container py-10 mx-auto px-4 md:px-6">
      <h1 className="font-display text-4xl">Menu</h1>
      <p className="mt-2 text-muted-foreground">
        낮은 커피와 브런치, 밤은 칵테일과 와인을 즐겨보세요.
      </p>
      <MenuTabs />
    </main>
  );
}
