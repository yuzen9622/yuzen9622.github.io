import BlogContextProvider from "./BlogContextProvider";

import { useBlogLoader } from "../hooks/useBlogLoader";
import type { ImgResponse } from "../types/blog";

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const { posts, loading, error } = useBlogLoader();
  function getFallbackSrc(data: ImgResponse): string {
    // 邏輯：優先找 large -> medium -> small -> thumbnail
    // 找到第一個存在的就回傳
    if (data.large) return data.large.url;
    if (data.medium) return data.medium.url;
    if (data.small) return data.small.url;
    if (data.thumbnail) return data.thumbnail.url;
    return "/default-placeholder.png"; // 真的什麼都沒有時的預設圖
  }
  return (
    <BlogContextProvider.Provider
      value={{ posts, loading, error, getFallbackSrc }}
    >
      {children}
    </BlogContextProvider.Provider>
  );
}
