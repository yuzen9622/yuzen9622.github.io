import BlogContextProvider from "./BlogContextProvider";

import { useBlogLoader } from "../hooks/useBlogLoader";
import type { ImgResponse } from "../types/blog";

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const { posts, loading, error } = useBlogLoader();

  function getFallbackSrc(data?: ImgResponse): string {
    if (data?.large) return data.large.url;
    if (data?.medium) return data.medium.url;
    if (data?.small) return data.small.url;
    if (data?.thumbnail) return data.thumbnail.url;
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
