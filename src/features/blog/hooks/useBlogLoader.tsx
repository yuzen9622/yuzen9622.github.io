import { useState, useEffect } from "react";
import type { BlogPost } from "../types/blog";

export const useBlogLoader = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogMetadata = async () => {
      try {
        const response = await fetch("/content/blogs/metadata.json");
        if (!response.ok) throw new Error("Failed to load blog metadata");

        const metadata = await response.json();
        setPosts(metadata.posts.filter((post: BlogPost) => post.published));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    loadBlogMetadata();
  }, []);

  const loadPostContent = async (slug: string): Promise<string> => {
    try {
      const response = await fetch(`/content/blogs/posts/${slug}.md`);
      if (!response.ok) throw new Error("Failed to load blog post");
      return await response.text();
    } catch (err) {
      console.log(err);
      throw new Error("Failed to load blog content");
    }
  };

  return { posts, loading, error, loadPostContent };
};
