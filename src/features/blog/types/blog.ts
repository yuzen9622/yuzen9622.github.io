export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  readTime: number;
  coverImage: string;
  published: boolean;
  language: "en" | "zh";
  content?: string;
};

export type BlogMetadata = {
  posts: BlogPost[];
};

export type BlogFilter = {
  tag?: string;
  search?: string;
  year?: string;
};
