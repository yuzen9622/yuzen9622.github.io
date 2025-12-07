import { createContext } from "react";
import type { Article, ImgResponse } from "../types/blog";

interface BlogContextType {
  posts: Article[] | null;
  getFallbackSrc: (imgResponse?: ImgResponse) => string;
  loading: boolean;
  error?: string | null;
}

const BlogContextProvider = createContext<BlogContextType | undefined>(
  undefined
);

export default BlogContextProvider;
