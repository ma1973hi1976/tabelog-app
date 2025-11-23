# 🍽️ グルメレビュー - 食べログ風レビューサイト

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + SQLiteで構築された、シンプルなグルメレビューサイトです。

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma)](https://www.prisma.io/)

## ✨ デモ

[🌐 Live Demo](https://your-app-name.vercel.app) *(デプロイ後にURLを更新してください)*

## 🚀 機能

- **店舗管理**
  - 店舗の登録（匿名）
  - 店舗一覧表示
  - 店舗詳細表示
  - 店舗削除（パスワード保護）

- **レビュー機能**
  - レビュー投稿（匿名）
  - 5段階評価
  - レビュー削除（パスワード保護）
  - 平均評価の自動計算

- **検索・絞り込み**
  - キーワード検索
  - エリア絞り込み
  - カテゴリ絞り込み
  - 並び替え（新着順、評価順、レビュー数順）

- **リッチなUI**
  - shadcn/uiコンポーネント使用
  - Framer Motionアニメーション
  - レスポンシブデザイン
  - Lucide Icons

## 🛠️ 技術スタック

- **フロントエンド**
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Radix UI
  - Framer Motion
  - Lucide Icons

- **バックエンド**
  - Next.js API Routes
  - Prisma ORM
  - SQLite

## 📦 セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. データベースをセットアップ

```bash
# Prismaクライアントを生成
npx prisma generate

# データベースを作成
npx prisma db push

# サンプルデータを投入
npm run seed
```

### 4. 開発サーバーを起動

```bash
npm run dev
```

サーバーが起動したら、ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## 🗄️ データベース

SQLiteデータベース（`dev.db`）は既に作成され、サンプルデータも投入されています。

### データベースのリセット

データベースをリセットしたい場合：

```bash
# データベースを再作成
npx prisma db push

# サンプルデータを投入
npm run seed
```

### Prisma Studio（データベースGUI）

データベースの内容を確認・編集したい場合：

```bash
npx prisma studio
```

## 📝 使い方

### 店舗の登録

1. ヘッダーの「店舗を登録」ボタンをクリック
2. 店舗情報を入力（店舗名は必須）
3. 必要に応じて編集用パスワードを設定
4. 「店舗を登録」ボタンをクリック

### レビューの投稿

1. 店舗詳細ページを開く
2. サイドバーの「レビューを投稿」フォームに入力
3. 評価（星1〜5）を選択
4. レビュー本文を入力（必須）
5. 必要に応じて編集用パスワードを設定
6. 「レビューを投稿」ボタンをクリック

### 削除機能

- 店舗やレビューに設定した「編集用パスワード」を使用して削除できます
- パスワードを設定していない場合は削除できません

## 🔑 デフォルトのパスワード

サンプルデータの編集用パスワード：
- 店舗: `password123`
- レビュー: `review123`

## 📱 レスポンシブデザイン

このサイトはモバイル、タブレット、デスクトップに対応しています。

## 🎨 カスタマイズ

### カラーテーマ

`app/globals.css`でカラーテーマをカスタマイズできます。

### コンポーネント

`components/ui/`にshadcn/uiのコンポーネントがあります。
必要に応じてスタイルを変更できます。

## 📂 プロジェクト構造

```
02_tabelog/
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── stores/         # 店舗API
│   │   └── reviews/        # レビューAPI
│   ├── stores/             # 店舗ページ
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # トップページ
│   └── globals.css         # グローバルスタイル
├── components/              # Reactコンポーネント
│   ├── ui/                 # shadcn/uiコンポーネント
│   ├── layout/             # レイアウトコンポーネント
│   ├── stores/             # 店舗関連コンポーネント
│   └── reviews/            # レビュー関連コンポーネント
├── lib/                     # ユーティリティ
│   ├── db.ts               # Prismaクライアント
│   ├── utils.ts            # ユーティリティ関数
│   └── validations.ts      # バリデーション関数
├── prisma/                  # Prismaスキーマ
│   ├── schema.prisma       # データベーススキーマ
│   └── seed.ts             # シードデータ
└── public/                  # 静的ファイル
```

## 🚀 デプロイ

### Vercelへのデプロイ（推奨）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)

詳細な手順は [DEPLOY.md](./DEPLOY.md) をご覧ください。

**重要：** 本番環境ではSQLiteではなく、PostgreSQLまたはMySQLの使用を推奨します。

### 本番環境用データベース

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) （推奨）
- [Supabase](https://supabase.com/)
- [PlanetScale](https://planetscale.com/)

## 🔐 セキュリティについて

⚠️ **本プロジェクトは学習・デモ用途です**

- ユーザー認証機能なし
- パスワードは平文保存
- 本番環境で使用する場合は、以下の対策が必要：
  - ユーザー認証の実装
  - パスワードのハッシュ化（bcrypt等）
  - CSRF対策
  - レート制限
  - 入力バリデーションの強化

## 🚨 注意事項

- このプロジェクトはローカル開発環境での使用を想定しています
- 認証機能がないため、本番環境での使用は推奨しません
- パスワードは平文で保存されています（学習目的のため）

## 🛠️ 技術スタック詳細

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 16 (App Router) |
| 言語 | TypeScript 5.9 |
| スタイリング | Tailwind CSS 3.4 |
| UIコンポーネント | shadcn/ui, Radix UI |
| アニメーション | Framer Motion |
| アイコン | Lucide Icons |
| データベース | SQLite / PostgreSQL |
| ORM | Prisma 5 |
| トースト通知 | Sonner |

## 📸 スクリーンショット

### トップページ
![店舗一覧](docs/screenshots/stores-list.png)

### 店舗詳細ページ
![店舗詳細](docs/screenshots/store-detail.png)

### レビュー投稿
![レビューフォーム](docs/screenshots/review-form.png)

## 📄 ライセンス

MIT

## 🤝 貢献

プルリクエストは歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 👨‍💻 作者

開発：あなたの名前

## 🙏 謝辞

- [食べログ](https://tabelog.com/) - UI/UXのインスピレーション
- [shadcn/ui](https://ui.shadcn.com/) - 美しいUIコンポーネント
- [Unsplash](https://unsplash.com/) - 料理画像

---

作成日: 2024年11月

