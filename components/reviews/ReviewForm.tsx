"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ReviewFormProps {
  storeId: number;
}

export function ReviewForm({ storeId }: ReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast.error("評価を選択してください（必須）");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const visitDate = formData.get("visitDate") as string;

    // バリデーション
    if (!title || title.trim().length === 0) {
      toast.error("タイトルを入力してください（必須）");
      return;
    }

    if (!body || body.trim().length === 0) {
      toast.error("レビュー本文を入力してください（必須）");
      return;
    }

    if (!visitDate) {
      toast.error("来店日を選択してください（必須）");
      return;
    }

    setIsSubmitting(true);

    const data = {
      rating,
      nickname: formData.get("nickname") as string,
      title: title,
      body: body,
      visitDate: visitDate,
      editPassword: formData.get("editPassword") as string,
    };

    try {
      const response = await fetch(`/api/stores/${storeId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "レビューの投稿に失敗しました");
      }

      toast.success("レビューを投稿しました！");
      router.refresh();
      
      // フォームをリセット
      setRating(0);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50/50 to-white">
      <CardHeader>
        <CardTitle className="text-orange-700">レビューを投稿</CardTitle>
        <CardDescription>
          あなたの体験を共有してください 📝
          <br />
          <span className="text-xs text-destructive">* は必須項目です</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 評価スター */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">
              評価 <span className="text-destructive">*</span>
            </Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <motion.button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 transition-colors ${
                      value <= (hoveredRating || rating)
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                </motion.button>
              ))}
              <span className="ml-2 text-2xl font-bold">
                {rating > 0 ? rating.toFixed(1) : "---"}
              </span>
            </div>
          </div>

          {/* ニックネーム */}
          <div className="space-y-2">
            <Label htmlFor="nickname">ニックネーム</Label>
            <Input
              id="nickname"
              name="nickname"
              placeholder="匿名"
              maxLength={50}
            />
          </div>

          {/* タイトル */}
          <div className="space-y-2">
            <Label htmlFor="title">
              タイトル <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              required
              placeholder="例：最高のランチでした！"
              maxLength={100}
            />
          </div>

          {/* 本文 */}
          <div className="space-y-2">
            <Label htmlFor="body">
              レビュー本文 <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="body"
              name="body"
              required
              placeholder="お店の雰囲気、料理、サービスなどについて教えてください（必須）"
              className="min-h-[150px]"
              maxLength={1000}
            />
          </div>

          {/* 来店日 */}
          <div className="space-y-2">
            <Label htmlFor="visitDate">
              来店日 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="visitDate"
              name="visitDate"
              type="date"
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* 編集用パスワード */}
          <div className="space-y-2">
            <Label htmlFor="editPassword">編集用パスワード</Label>
            <Input
              id="editPassword"
              name="editPassword"
              type="password"
              placeholder="後で削除する場合に必要"
              maxLength={50}
            />
            <p className="text-sm text-muted-foreground">
              ※パスワードを設定すると、後でレビューを削除できます
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            size="lg"
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                投稿中...
              </>
            ) : (
              "レビューを投稿"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

