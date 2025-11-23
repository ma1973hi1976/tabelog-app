// バリデーション関数

export function validateStoreName(name: string): string | null {
  if (!name || name.trim().length === 0) {
    return "店舗名は必須です";
  }
  if (name.length > 100) {
    return "店舗名は100文字以内で入力してください";
  }
  return null;
}

export function validateReviewBody(body: string): string | null {
  if (!body || body.trim().length === 0) {
    return "レビュー本文は必須です";
  }
  if (body.length > 1000) {
    return "レビュー本文は1000文字以内で入力してください";
  }
  return null;
}

export function validateRating(rating: number): string | null {
  if (rating < 1 || rating > 5) {
    return "評価は1〜5の範囲で入力してください";
  }
  return null;
}

export function sanitizeString(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

