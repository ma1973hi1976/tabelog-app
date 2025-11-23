"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X } from "lucide-react";

const categories = [
  "ラーメン",
  "カフェ",
  "居酒屋",
  "イタリアン",
  "和食",
  "中華",
  "焼肉",
  "寿司",
  "その他",
];

const areas = [
  "東京",
  "大阪",
  "名古屋",
  "福岡",
  "札幌",
  "横浜",
  "神戸",
  "京都",
  "その他",
];

export function StoreSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [area, setArea] = useState(searchParams.get("area") || undefined);
  const [category, setCategory] = useState(searchParams.get("category") || undefined);
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (area) params.set("area", area);
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    
    router.push(`/stores?${params.toString()}`);
  };

  const handleReset = () => {
    setKeyword("");
    setArea(undefined);
    setCategory(undefined);
    setSort("latest");
    router.push("/stores");
  };

  return (
    <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50/30 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700">
          <Search className="w-5 h-5" />
          店舗を検索 🔍
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="keyword">キーワード</Label>
            <Input
              id="keyword"
              placeholder="店舗名で検索"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">エリア</Label>
            <Select value={area} onValueChange={(value) => setArea(value === "all" ? undefined : value)}>
              <SelectTrigger id="area">
                <SelectValue placeholder="すべて" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                {areas.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">カテゴリ</Label>
            <Select value={category} onValueChange={(value) => setCategory(value === "all" ? undefined : value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="すべて" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort">並び順</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger id="sort">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">新着順</SelectItem>
                <SelectItem value="rating">評価が高い順</SelectItem>
                <SelectItem value="reviews">レビュー数順</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1 gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
            <Search className="w-4 h-4" />
            検索
          </Button>
          <Button onClick={handleReset} variant="outline" className="gap-2 border-orange-300 text-orange-600 hover:bg-orange-50">
            <X className="w-4 h-4" />
            クリア
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

