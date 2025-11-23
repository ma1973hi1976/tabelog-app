// ジャンル別の料理画像URL（Unsplash）
export const foodImages: Record<string, string> = {
  ラーメン: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop",
  カフェ: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
  居酒屋: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
  イタリアン: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=800&h=600&fit=crop",
  和食: "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800&h=600&fit=crop",
  中華: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&h=600&fit=crop",
  焼肉: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop",
  寿司: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop",
  その他: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
};

export function getFoodImage(category: string | null | undefined): string {
  if (!category) return foodImages["その他"];
  return foodImages[category] || foodImages["その他"];
}

