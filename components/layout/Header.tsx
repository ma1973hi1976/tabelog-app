"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Plus } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-orange-500 to-red-500 shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <UtensilsCrossed className="h-8 w-8 text-white" />
          </motion.div>
          <span className="text-xl font-bold text-white drop-shadow-md">
            グルメレビュー
          </span>
        </Link>
        
        <nav className="flex items-center space-x-4">
          <Link href="/stores">
            <Button variant="ghost" className="text-white hover:bg-white/20">店舗一覧</Button>
          </Link>
          <Link href="/stores/new">
            <Button className="gap-2 bg-white text-orange-600 hover:bg-orange-50 font-bold">
              <Plus className="h-4 w-4" />
              店舗を登録
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}

