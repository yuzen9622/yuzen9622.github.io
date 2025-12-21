import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BlogCard from "./BlogCard";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { motion, AnimatePresence } from "framer-motion";
import useBlog from "./hooks/useBlog";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { cn } from "@/shared/lib/utils";
import { useTranslation } from "react-i18next";

export default function BlogList() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [publishedOnly, setPublishedOnly] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const { t } = useTranslation("blog");
  const { posts, loading, error } = useBlog();
  const allTags = useMemo(() => {
    if (!posts) return [];
    const tags = new Set<string>();
    posts.forEach((post) =>
      post.categories.forEach((category) => tags.add(category.name))
    );
    return Array.from(tags);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const list = (posts ?? []).filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag =
        !selectedTag ||
        post.categories.some((category) => category.name === selectedTag);
      const matchesPublished = !publishedOnly || post.isPublished;
      return matchesSearch && matchesTag && matchesPublished;
    });

    return list.slice().sort((a, b) => {
      const aTime = Date.parse(a.publishedAt ?? "") || 0;
      const bTime = Date.parse(b.publishedAt ?? "") || 0;
      return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
    });
  }, [posts, search, selectedTag, publishedOnly, sortOrder]);

  if (error) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <p className="text-2xl text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      className={cn("w-full max-w-6xl mx-auto p-5 space-y-8")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <div className="relative flex-1 backdrop-blur-3xl rounded-3xl">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <Input
              type="text"
              placeholder={t("blog.searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 pl-10 rounded-3xl"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-3xl backdrop-blur-3xl"
                aria-label={t("blog.filters")}
              >
                <SlidersHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="backdrop-blur-md bg-background/50"
            >
              <DropdownMenuLabel className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                {t("blog.filters")}
              </DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={publishedOnly}
                onCheckedChange={(checked) =>
                  setPublishedOnly(Boolean(checked))
                }
              >
                {t("blog.publishedOnly")}
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />

              <DropdownMenuLabel className="flex items-center gap-2">
                <ArrowDownWideNarrow size={16} />
                {t("blog.sort")}
              </DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={sortOrder}
                onValueChange={(value) =>
                  setSortOrder(value === "oldest" ? "oldest" : "newest")
                }
              >
                <DropdownMenuRadioItem value="newest">
                  {t("blog.sortNewest")}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">
                  {t("blog.sortOldest")}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? "default" : "outline"}
            className="cursor-pointer  backdrop-blur-md px-3 py-1 rounded-3xl"
            onClick={() => setSelectedTag(null)}
          >
            {t("blog.all")}
          </Badge>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer  backdrop-blur-md px-3 py-2 rounded-3xl"
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </motion.div>
      {loading ? (
        <div className="w-full min-h-[50vh] flex items-center justify-center">
          <motion.div
            className="w-full max-w-6xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </motion.div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filteredPosts?.length === 0 ? (
            <motion.div
              key="no-posts"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-muted-foreground">暫無文章</p>
            </motion.div>
          ) : (
            <motion.div
              key="posts-grid"
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredPosts?.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
