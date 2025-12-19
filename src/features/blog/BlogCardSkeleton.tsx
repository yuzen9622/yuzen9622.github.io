import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  imageHeight?: string;
  showBadges?: boolean;
};

export default function BlogCardSkeleton({
  imageHeight = "h-48",
  showBadges = true,
}: Props) {
  return (
    <div className="group backdrop-blur-xs pt-0 bg-background/80 transition-all h-full rounded-none overflow-hidden shadow-sm">
      <div
        className={`relative w-full ${imageHeight} overflow-hidden rounded-none`}
      >
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      <div className="p-4 space-y-4">
        <Skeleton className="w-3/4 h-6" />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-20 h-4" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-5/6 h-4" />
        </div>

        {showBadges && (
          <div className="flex flex-wrap gap-2">
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-12 h-6 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
