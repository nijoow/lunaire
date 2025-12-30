import { getAllMenuItems } from '@/domain/menu/menu.service';
import { MenuTabs } from './_components/menu-tabs';

export default async function MenuPage() {
  const items = await getAllMenuItems();

  return (
    <main className="container mx-auto px-4 py-10 md:px-6">
      <h1 className="font-display text-4xl">Menu</h1>
      <p className="text-muted-foreground mt-2">
        낮은 커피와 브런치, 밤은 칵테일과 와인을 즐겨보세요.
      </p>
      <MenuTabs items={items} />
    </main>
  );
}
