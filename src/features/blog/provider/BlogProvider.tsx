import BlogContextProvider from "./BlogContextProvider";

import { useBlogLoader } from "../hooks/useBlogLoader";
import type { ImgResponse } from "../types/blog";

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const { posts, loading, error } = useBlogLoader();
  function getFallbackSrc(data?: ImgResponse): string {
    const baseURL = import.meta.env.VITE_API_END_POINT;

    if (data?.large) return baseURL + data.large.url;
    if (data?.medium) return baseURL + data.medium.url;
    if (data?.small) return baseURL + data.small.url;
    if (data?.thumbnail) return baseURL + data.thumbnail.url;
    return "/blog/default-placeholder.webp";
  }
  return (
    <BlogContextProvider.Provider
      value={{ posts, loading, error, getFallbackSrc }}
    >
      {children}
    </BlogContextProvider.Provider>
  );
}
