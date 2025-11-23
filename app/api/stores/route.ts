import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateStoreName } from "@/lib/validations";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get("q") || "";
    const area = searchParams.get("area") || "";
    const category = searchParams.get("category") || "";
    const sort = searchParams.get("sort") || "latest";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

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
    
    if (sort === "rating") {
      // 評価順 - レビューの平均を計算する必要があるため、後でソート
    } else if (sort === "reviews") {
      // レビュー数順 - 後でソート
    }

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
        address: store.address,
        phone: store.phone,
        businessHours: store.businessHours,
        budgetRange: store.budgetRange,
        description: store.description,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt,
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

    return NextResponse.json({
      stores: storesWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json(
      { error: "店舗の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      address,
      area,
      category,
      phone,
      businessHours,
      budgetRange,
      description,
      editPassword,
    } = body;

    // バリデーション
    const nameError = validateStoreName(name);
    if (nameError) {
      return NextResponse.json({ error: nameError }, { status: 400 });
    }

    // 店舗を作成
    const store = await prisma.store.create({
      data: {
        name,
        address: address || null,
        area: area || null,
        category: category || null,
        phone: phone || null,
        businessHours: businessHours || null,
        budgetRange: budgetRange || null,
        description: description || null,
        editPassword: editPassword || null,
      },
    });

    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error("Error creating store:", error);
    return NextResponse.json(
      { error: "店舗の作成に失敗しました" },
      { status: 500 }
    );
  }
}

