import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BlogCard from "./BlogCard";

import { motion, AnimatePresence } from "framer-motion";
import useBlog from "./hooks/useBlog";
import BlogCardSkeleton from "./BlogCardSkeleton";
export default function BlogList() {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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
    return posts?.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag =
        !selectedTag ||
        post.categories.some((category) => category.name === selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, search, selectedTag]);

  if (loading) {
    return (
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
    );
  }
  if (error) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center">
        <p className="text-2xl text-destructive">Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto p-5 space-y-8"
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
        <div className="relative  backdrop-blur-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? "default" : "outline"}
            className="cursor-pointer  backdrop-blur-md px-3 py-1 rounded-3xl"
            onClick={() => setSelectedTag(null)}
          >
            全部
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
    </motion.div>
  );
}
