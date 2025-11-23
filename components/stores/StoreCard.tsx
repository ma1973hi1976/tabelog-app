"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getFoodImage } from "@/lib/foodImages";

interface StoreCardProps {
  id: number;
  name: string;
  area?: string | null;
  category?: string | null;
  averageRating: number;
  reviewCount: number;
  latestReviewDate?: Date | null;
}

export function StoreCard({
  id,
  name,
  area,
  category,
  averageRating,
  reviewCount,
  latestReviewDate,
}: StoreCardProps) {
  return (
    <Link href={`/stores/${id}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="cursor-pointer hover:shadow-xl transition-shadow duration-300 border-2 hover:border-orange-300 h-full overflow-hidden">
          {/* 料理画像 */}
          <div className="relative h-48 w-full overflow-hidden bg-gray-100">
            <Image
              src={getFoodImage(category)}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-br from-yellow-400 to-orange-500 px-3 py-1.5 rounded-full shadow-lg">
              <Star className="w-5 h-5 fill-white text-white" />
              <span className="font-bold text-lg text-white">
                {averageRating > 0 ? averageRating.toFixed(1) : "---"}
              </span>
            </div>
          </div>
          
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold line-clamp-1">
              {name}
            </CardTitle>
            <CardDescription className="flex flex-wrap gap-2 mt-2">
              {area && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {area}
                </Badge>
              )}
              {category && (
                <Badge variant="outline" className="font-medium">
                  {category}
                </Badge>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{reviewCount}件のレビュー</span>
              </div>
              {latestReviewDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(latestReviewDate).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

