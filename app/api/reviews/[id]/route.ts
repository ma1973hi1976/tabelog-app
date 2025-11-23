import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "無効なレビューIDです" },
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

    // レビューを取得
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json(
        { error: "レビューが見つかりません" },
        { status: 404 }
      );
    }

    // パスワードチェック
    if (review.editPassword !== editPassword) {
      return NextResponse.json(
        { error: "パスワードが正しくありません" },
        { status: 401 }
      );
    }

    // レビューを削除
    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ message: "レビューを削除しました" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "レビューの削除に失敗しました" },
      { status: 500 }
    );
  }
}

