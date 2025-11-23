"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

interface ReviewStatsProps {
  averageRating: number;
  reviewCount: number;
}

export function ReviewStats({ averageRating, reviewCount }: ReviewStatsProps) {
  const ratingDistribution = [5, 4, 3, 2, 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          レビュー統計
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 平均評価 */}
          <div className="flex items-center justify-center gap-4 p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-200">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {averageRating > 0 ? averageRating.toFixed(1) : "---"}
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="text-center border-l-2 border-orange-300 pl-4">
              <div className="flex items-center gap-2 text-2xl font-bold text-orange-600">
                <MessageSquare className="w-6 h-6" />
                {reviewCount}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                件のレビュー
              </div>
            </div>
          </div>

          {/* 評価分布 */}
          <div className="space-y-2">
            {ratingDistribution.map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-16">
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "40%" }}
                    transition={{ duration: 0.5, delay: rating * 0.1 }}
                    className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">0</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

