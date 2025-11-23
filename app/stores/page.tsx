import { Suspense } from "react";
import { StoreSearchForm } from "@/components/stores/StoreSearchForm";
import { StoreCard } from "@/components/stores/StoreCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { prisma } from "@/lib/db";

async function getStores(searchParams: any) {
  try {
    const q = searchParams.q || "";
    const area = searchParams.area || "";
    const category = searchParams.category || "";
    const sort = searchParams.sort || "latest";
    const page = parseInt(searchParams.page || "1");
    const limit = 20;

    // フィルタ条件を構築
    const where: any = {};
    
    if (q) {
      where.name = { contains: q };
    }
    
    if (area) {
      where.area = area;
    }
    
    if (category) {
      where.category = category;
    }

    // ソート順を決定
    let orderBy: any = { createdAt: "desc" }; // デフォルト: 新着順

    // 店舗を取得
    const stores = await prisma.store.findMany({
      where,
      include: {
        reviews: {
          select: {
            rating: true,
            createdAt: true,
          },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    });

    // 平均評価とレビュー数を計算
    const storesWithStats = stores.map((store) => {
      const reviews = store.reviews;
      const reviewCount = reviews.length;
      const averageRating =
        reviewCount > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
          : 0;
      const latestReviewDate =
        reviewCount > 0
          ? reviews.reduce(
              (latest, r) => (r.createdAt > latest ? r.createdAt : latest),
              reviews[0].createdAt
            )
          : null;

      return {
        id: store.id,
        name: store.name,
        area: store.area,
        category: store.category,
        averageRating,
        reviewCount,
        latestReviewDate,
      };
    });

    // ソート（評価順またはレビュー数順の場合）
    if (sort === "rating") {
      storesWithStats.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sort === "reviews") {
      storesWithStats.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    // 総数を取得
    const total = await prisma.store.count({ where });

    return {
      stores: storesWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error('Error in getStores:', error);
    throw error;
  }
}

export default async function StoresPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const data = await getStores(params);
  const { stores, pagination } = data;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      {/* ヘッダー */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          店舗一覧
        </h1>
        <p className="text-gray-600">
          気になるお店を探して、レビューをチェックしよう 🍽️
        </p>
      </div>

      {/* 検索フォーム */}
      <Suspense fallback={<Skeleton className="h-48 w-full" />}>
        <StoreSearchForm />
      </Suspense>

      {/* 結果表示 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {pagination.total}件の店舗が見つかりました
          </p>
        </div>

        {stores.length === 0 ? (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertDescription>
              条件に一致する店舗が見つかりませんでした。検索条件を変更してお試しください。
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store: any) => (
              <StoreCard
                key={store.id}
                id={store.id}
                name={store.name}
                area={store.area}
                category={store.category}
                averageRating={store.averageRating}
                reviewCount={store.reviewCount}
                latestReviewDate={store.latestReviewDate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

