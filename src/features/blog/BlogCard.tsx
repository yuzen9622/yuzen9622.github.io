import { ArrowUpRightIcon, Calendar } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Article } from "./types/blog";
import { motion } from "framer-motion";
import useBlog from "./hooks/useBlog";
import { useMemo } from "react";
import { toast } from "sonner";

import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: Article;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { getFallbackSrc } = useBlog();
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation();
  const MotionCard = useMemo(() => motion.create(Card), []);
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      exit={{ opacity: 0, y: 40 }}
    >
      <NavLink
        onClick={() => {
          if (post.isPublished) return;
          toast.info(`「${post.title}」${t("toast:toast.NotPublished")}`, {
            duration: 3000,
          });
        }}
        to={post.isPublished ? `/${lng}/blog/${post.slug}` : `/${lng}/blog`}
      >
        <MotionCard className="group backdrop-blur-xs rounded-none pt-0 justify-between   bg-background/80 hover:shadow-lg transition-all h-full ">
          <motion.img
            layoutId={`blog-image-${post.slug}`}
            className="h-48"
            alt={post.title}
            src={getFallbackSrc(post.cover?.formats)}
          />

          <CardHeader>
            <CardTitle className=" group-hover:underline underline-offset-2 text-xl transition-colors">
              <motion.span>{post.title}</motion.span>
            </CardTitle>
            <CardDescription className="flex gap-2">
              <Calendar size={16} />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.description}
            </p>
          </CardContent>
          <CardFooter className=" justify-self-end flex justify-between">
            {post.categories.slice(0, 2).map((category) => (
              <Badge
                key={category.name}
                variant="outline"
                className="px-3 py-2 rounded-3xl"
              >
                {category.name}
              </Badge>
            ))}
            <Button
              variant={post.isPublished ? "link" : "secondary"}
              className="group-hover:underline"
            >
              {post.isPublished
                ? t("blog:blog.ReadFull")
                : t("blog:blog.NotPublished")}
              {post.isPublished && (
                <ArrowUpRightIcon className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              )}
            </Button>
          </CardFooter>
        </MotionCard>
      </NavLink>
    </motion.div>
  );
}
