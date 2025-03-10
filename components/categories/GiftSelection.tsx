import { getHomeCategories } from "lib/bagisto";
import GiftSelectionClient from "./GiftSelectionClient";

export default async function GiftSelection() {
  var categoriesData = await getHomeCategories();
  categoriesData.shift();
  for (let i = 0; i < categoriesData.length; i++) {
    
    categoriesData[i]!.logoPath = "http://localhost:8000/storage/" + categoriesData[i]!.logoPath;
    if(categoriesData[i]!.parentId != "1"){
      categoriesData = categoriesData.filter(category => category.parentId === "1");

    }
  }
  
  
  const categories = categoriesData.map((item: any, index: number) => ({
    id: item.id || `category-${index}`,
    name: item.name,
    path: item.path,
    logoPath: item.logoPath || "/placeholder.jpg",

  }));

  return <GiftSelectionClient categories={categories} />;
}
