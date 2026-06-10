import type { MenuItem } from "@/types/product";
import { MenuCard } from "@/components/products/MenuCard";

interface MenuGridProps {
  items: MenuItem[];
}

export function MenuGrid({ items }: MenuGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <MenuCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
