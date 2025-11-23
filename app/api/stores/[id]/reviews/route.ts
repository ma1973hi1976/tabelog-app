import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateReviewBody, validateRating } from "@/lib/validations";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const storeId = parseInt(params.id);

    if (isNaN(storeId)) {
      return NextResponse.json(
        { error: "無効な店舗IDです" },
        { status: 400 }
      );
    }

    // 店舗の存在確認
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return NextResponse.json(
        { error: "店舗が見つかりません" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { rating, nickname, title, body: reviewBody, visitDate, editPassword } = body;

    // バリデーション
    const ratingError = validateRating(rating);
    if (ratingError) {
      return NextResponse.json({ error: ratingError }, { status: 400 });
    }

    const bodyError = validateReviewBody(reviewBody);
    if (bodyError) {
      return NextResponse.json({ error: bodyError }, { status: 400 });
    }

    // レビューを作成
    const review = await prisma.review.create({
      data: {
        storeId,
        rating,
        nickname: nickname || null,
        title: title || null,
        body: reviewBody,
        visitDate: visitDate || null,
        editPassword: editPassword || null,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "レビューの作成に失敗しました" },
      { status: 500 }
    );
  }
}

