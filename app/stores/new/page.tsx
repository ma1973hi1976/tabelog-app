import { StoreForm } from "@/components/stores/StoreForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewStorePage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      <div className="space-y-4">
        <Link href="/stores">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            店舗一覧に戻る
          </Button>
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            新しい店舗を登録
          </h1>
          <p className="text-gray-600">
            おすすめのお店を共有しましょう 🍽️
          </p>
        </div>
      </div>

      <StoreForm />
    </div>
  );
}

