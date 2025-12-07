import type { Article, BlogAPIResponse } from "../types/blog";
import { ARTICLES_QUERY } from "./blogQuery";

export const BLOG_API = {
  ARTICLES: async (): Promise<BlogAPIResponse<Article[]>> => {
    const response = await fetch(ARTICLES_QUERY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN ?? ""}`,
      },
    });
    return await response.json();
  },
};
