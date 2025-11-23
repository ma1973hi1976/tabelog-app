"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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

export function StoreForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      area: formData.get("area") as string,
      category: formData.get("category") as string,
      phone: formData.get("phone") as string,
      businessHours: formData.get("businessHours") as string,
      budgetRange: formData.get("budgetRange") as string,
      description: formData.get("description") as string,
      editPassword: formData.get("editPassword") as string,
    };

    try {
      const response = await fetch("/api/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "店舗の登録に失敗しました");
      }

      const store = await response.json();
      toast.success("店舗を登録しました！");
      router.push(`/stores/${store.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>新しい店舗を登録</CardTitle>
        <CardDescription>
          店舗情報を入力してください。※店舗名は必須です。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              店舗名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="例：山田ラーメン"
              maxLength={100}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area">エリア</Label>
              <Input
                id="area"
                name="area"
                placeholder="例：東京"
                maxLength={50}
                list="area-list"
              />
              <datalist id="area-list">
                {areas.map((area) => (
                  <option key={area} value={area} />
                ))}
              </datalist>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">カテゴリ</Label>
              <Input
                id="category"
                name="category"
                placeholder="例：ラーメン"
                maxLength={50}
                list="category-list"
              />
              <datalist id="category-list">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">住所</Label>
            <Input
              id="address"
              name="address"
              placeholder="例：東京都渋谷区〇〇1-2-3"
              maxLength={200}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">電話番号</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="例：03-1234-5678"
                maxLength={20}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetRange">予算帯</Label>
              <Input
                id="budgetRange"
                name="budgetRange"
                placeholder="例：1000〜3000円"
                maxLength={50}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessHours">営業時間</Label>
            <Input
              id="businessHours"
              name="businessHours"
              placeholder="例：11:00〜22:00（定休日：月曜）"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">店舗説明</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="店舗の特徴やおすすめポイントを入力してください"
              className="min-h-[120px]"
              maxLength={1000}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="editPassword">編集用パスワード</Label>
            <Input
              id="editPassword"
              name="editPassword"
              type="password"
              placeholder="後で店舗を削除する際に必要です"
              maxLength={50}
            />
            <p className="text-sm text-muted-foreground">
              ※パスワードを設定すると、後で店舗情報を削除できます
            </p>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登録中...
                </>
              ) : (
                "店舗を登録"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

