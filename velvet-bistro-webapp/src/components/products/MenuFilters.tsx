import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { menuCategories } from "@/data/menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type SortOption = "name" | "price-asc" | "price-desc";

interface MenuFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}

const categoryKeyMap: Record<string, string> = {
  breakfast: "breakfast",
  "main-courses": "mainCourses",
  desserts: "desserts",
  coffee: "coffee",
  "signature-drinks": "signatureDrinks",
  "fine-dining": "fineDining",
};

export function MenuFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: MenuFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <Tabs value={category} onValueChange={onCategoryChange}>
        <TabsList className="flex h-auto flex-wrap gap-1 bg-transparent p-0">
          <TabsTrigger value="all" className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
            {t("categories.all")}
          </TabsTrigger>
          {menuCategories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="data-[state=active]:bg-gold data-[state=active]:text-charcoal">
              {t(`categories.${categoryKeyMap[cat]}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("menu.search")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t("menu.sort")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">{t("menu.sortName")}</SelectItem>
            <SelectItem value="price-asc">{t("menu.sortPriceLow")}</SelectItem>
            <SelectItem value="price-desc">{t("menu.sortPriceHigh")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
