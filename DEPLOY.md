# デプロイ手順

## 🚀 Vercelへのデプロイ

### 1. 前提条件
- GitHubアカウント
- Vercelアカウント（無料）

### 2. GitHubリポジトリの作成

プロジェクトをGitHubにpushします：

```bash
# Gitの初期化
git init

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: 食べログ風レビューサイト"

# GitHubリポジトリを作成後、リモートを追加
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# pushする
git push -u origin main
```

### 3. Vercelでデプロイ

#### 3-1. Vercelにログイン
https://vercel.com にアクセスしてGitHubアカウントでログイン

#### 3-2. 新しいプロジェクトをインポート
1. 「Add New...」→「Project」をクリック
2. GitHubリポジトリを選択
3. 「Import」をクリック

#### 3-3. 環境変数の設定
以下の環境変数を設定します：

```
DATABASE_URL=file:./prisma/prod.db
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
```

**注意：** Vercelの無料プランではSQLiteのファイルが永続化されません。
本番環境では以下のいずれかを推奨：
- Vercel Postgres（推奨）
- PlanetScale（MySQL互換）
- Supabase（PostgreSQL）

#### 3-4. ビルド設定
- Framework Preset: Next.js
- Build Command: `prisma generate && next build`
- Output Directory: `.next`

#### 3-5. デプロイ
「Deploy」ボタンをクリックしてデプロイを開始

### 4. 本番環境用データベース設定（推奨）

#### Vercel Postgresを使用する場合

1. Vercelダッシュボードで「Storage」→「Create Database」
2. 「Postgres」を選択
3. プロジェクトに接続

4. `prisma/schema.prisma`を修正：
```prisma
datasource db {
  provider = "postgresql"  // sqlite から変更
  url      = env("DATABASE_URL")
}
```

5. マイグレーションを実行：
```bash
npx prisma migrate dev --name init
```

6. Vercelで再デプロイ

### 5. デプロイ後の確認

✅ トップページが表示される
✅ 店舗一覧が表示される
✅ 店舗詳細ページにアクセスできる
✅ レビューが投稿できる

### 6. カスタムドメインの設定（オプション）

1. Vercelダッシュボードで「Settings」→「Domains」
2. カスタムドメインを追加
3. DNSレコードを設定

---

## 🔄 再デプロイ

コードを更新した後：

```bash
git add .
git commit -m "Update: 機能追加"
git push
```

Vercelが自動的に再デプロイします。

---

## 🐛 トラブルシューティング

### ビルドエラーが発生する
- `npm install`を実行して依存関係を確認
- `npm run build`でローカルでビルドテスト

### データベース接続エラー
- 環境変数`DATABASE_URL`が正しく設定されているか確認
- 本番環境ではVercel PostgresまたはPlanetScaleの使用を推奨

### 画像が表示されない
- `next.config.mjs`の`remotePatterns`設定を確認

---

## 📝 注意事項

⚠️ **SQLiteは本番環境非推奨**
- Vercelの無料プランではファイルシステムが永続化されない
- デプロイごとにデータがリセットされる
- 本番環境ではPostgreSQLまたはMySQLを使用してください

✅ **推奨データベース**
- Vercel Postgres（最も簡単）
- Supabase（無料枠が大きい）
- PlanetScale（スケーラブル）

---

## 🎉 完了！

デプロイが成功したら、URLを共有してサイトを公開できます！

