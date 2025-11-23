"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star, Calendar, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReviewCardProps {
  id: number;
  rating: number;
  nickname?: string | null;
  title?: string | null;
  body: string;
  visitDate?: string | null;
  createdAt: Date;
}

export function ReviewCard({
  id,
  rating,
  nickname,
  title,
  body,
  visitDate,
  createdAt,
}: ReviewCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      toast.error("パスワードを入力してください");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editPassword: password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "削除に失敗しました");
      }

      toast.success("レビューを削除しました");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
            <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gradient-to-br from-orange-100 to-orange-200 px-2 py-1 rounded-md">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 font-bold text-sm text-orange-700">{rating.toFixed(1)}</span>
              </div>
              <Badge variant="outline">{nickname || "匿名"}</Badge>
            </div>
            {title && (
              <h3 className="font-bold text-lg">{title}</h3>
            )}
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>レビューを削除</DialogTitle>
                <DialogDescription>
                  このレビューを削除するには、投稿時に設定したパスワードを入力してください。
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Label htmlFor="password">編集用パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワードを入力"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  キャンセル
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      削除中...
                    </>
                  ) : (
                    "削除"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{body}</p>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          {visitDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>来店日: {visitDate}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              投稿日: {new Date(createdAt).toLocaleDateString("ja-JP")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

