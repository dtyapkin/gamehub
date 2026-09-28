import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({
  rating,
  size = "sm",
  className,
}: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(Math.max(rating - i, 0), 1);
    return (
      <span key={i} className="relative inline-block">
        <Star
          className={cn(
            "text-gray-300",
            size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4",
          )}
          fill="currentColor"
        />
        {fill > 0 && (
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${fill * 100}%` }}
          >
            <Star
              className={cn(
                "text-amber-400",
                size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4",
              )}
              fill="currentColor"
            />
          </span>
        )}
      </span>
    );
  });

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {stars}
      {/* <span className="ml-1 text-xs text-text-secondary">
        {rating.toFixed(1)}
      </span> */}
    </div>
  );
}
