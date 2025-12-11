import { useState, useEffect } from "react";
import type { Article } from "../types/blog";
import { BLOG_API } from "../service/blogAPI";
import { useTranslation } from "react-i18next";

export const useBlogLoader = () => {
  const [posts, setPosts] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();
  useEffect(() => {
    const loadBlogMetadata = async () => {
      try {
        setLoading(true);
        const response = await BLOG_API.ARTICLES(i18n.language);
        const metadata = response.data;
        setPosts(metadata.filter((post: Article) => post.publishedAt));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    loadBlogMetadata();
  }, [i18n.language]);

  return { posts, loading, error };
};
