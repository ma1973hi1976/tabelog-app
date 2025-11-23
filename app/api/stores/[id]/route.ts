import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "無効な店舗IDです" },
        { status: 400 }
      );
    }

    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        reviews: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!store) {
      return NextResponse.json(
        { error: "店舗が見つかりません" },
        { status: 404 }
      );
    }

    // 平均評価を計算
    const reviewCount = store.reviews.length;
    const averageRating =
      reviewCount > 0
        ? store.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
        : 0;

    // editPasswordを除外してレスポンス
    const { editPassword, ...storeData } = store;

    return NextResponse.json({
      ...storeData,
      averageRating,
      reviewCount,
    });
  } catch (error) {
    console.error("Error fetching store:", error);
    return NextResponse.json(
      { error: "店舗の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "無効な店舗IDです" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { editPassword } = body;

    if (!editPassword) {
      return NextResponse.json(
        { error: "パスワードが必要です" },
        { status: 400 }
      );
    }

    // 店舗を取得
    const store = await prisma.store.findUnique({
      where: { id },
    });

    if (!store) {
      return NextResponse.json(
        { error: "店舗が見つかりません" },
        { status: 404 }
      );
    }

    // パスワードチェック
    if (store.editPassword !== editPassword) {
      return NextResponse.json(
        { error: "パスワードが正しくありません" },
        { status: 401 }
      );
    }

    // 店舗を削除（関連するレビューもカスケード削除される）
    await prisma.store.delete({
      where: { id },
    });

    return NextResponse.json({ message: "店舗を削除しました" });
  } catch (error) {
    console.error("Error deleting store:", error);
    return NextResponse.json(
      { error: "店舗の削除に失敗しました" },
      { status: 500 }
    );
  }
}

