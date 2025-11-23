import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewStats } from "@/components/reviews/ReviewStats";
import { getFoodImage } from "@/lib/foodImages";
import { prisma } from "@/lib/db";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  DollarSign,
  Trash2,
  Star,
} from "lucide-react";

async function getStore(id: string) {
  try {
    const storeId = parseInt(id);

    if (isNaN(storeId)) {
      notFound();
    }

    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!store) {
      notFound();
    }

    // 平均評価を計算
    const reviewCount = store.reviews.length;
    const averageRating =
      reviewCount > 0
        ? store.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : 0;

    return {
      ...store,
      averageRating,
      reviewCount,
    };
  } catch (error) {
    console.error('Error in getStore:', error);
    throw error;
  }
}

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = await getStore(id);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* ナビゲーション */}
      <Link href="/stores">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          店舗一覧に戻る
        </Button>
      </Link>

      {/* 店舗情報 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* メイン画像 */}
          <Card className="overflow-hidden">
            <div className="relative h-96 w-full">
              <Image
                src={getFoodImage(store.category)}
                alt={store.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{store.name}</h1>
                <div className="flex items-center gap-2">
                  {store.area && (
                    <Badge className="bg-white/90 text-orange-600 hover:bg-white flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {store.area}
                    </Badge>
                  )}
                  {store.category && (
                    <Badge className="bg-orange-500/90 hover:bg-orange-500 text-white">
                      {store.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* 基本情報 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">店舗情報</CardTitle>
                <div className="flex items-center gap-2 shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500 px-4 py-2 rounded-lg">
                  <Star className="w-6 h-6 fill-white text-white" />
                  <span className="text-2xl font-bold text-white">
                    {store.averageRating > 0 ? store.averageRating.toFixed(1) : "---"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {store.description && (
                <>
                  <p className="text-sm leading-relaxed">{store.description}</p>
                  <Separator />
                </>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {store.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">住所</p>
                      <p className="text-sm text-muted-foreground">{store.address}</p>
                    </div>
                  </div>
                )}
                {store.phone && (
                  <div className="flex items-start gap-2">
                    <Phone className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">電話番号</p>
                      <p className="text-sm text-muted-foreground">{store.phone}</p>
                    </div>
                  </div>
                )}
                {store.businessHours && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">営業時間</p>
                      <p className="text-sm text-muted-foreground">{store.businessHours}</p>
                    </div>
                  </div>
                )}
                {store.budgetRange && (
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">予算帯</p>
                      <p className="text-sm text-muted-foreground">{store.budgetRange}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* レビュー一覧 */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">レビュー</h2>
            {store.reviews.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  まだレビューがありません。最初のレビューを投稿しませんか？
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {store.reviews.map((review: any) => (
                  <ReviewCard
                    key={review.id}
                    id={review.id}
                    rating={review.rating}
                    nickname={review.nickname}
                    title={review.title}
                    body={review.body}
                    visitDate={review.visitDate}
                    createdAt={review.createdAt}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* サイドバー */}
        <div className="space-y-6">
          {/* レビュー統計 */}
          <ReviewStats
            averageRating={store.averageRating}
            reviewCount={store.reviewCount}
          />

          {/* レビュー投稿フォーム */}
          <ReviewForm storeId={store.id} />
        </div>
      </div>
    </div>
  );
}

