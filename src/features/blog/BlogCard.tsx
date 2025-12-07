import { Calendar } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Article } from "./types/blog";
import { motion } from "framer-motion";
import useBlog from "./hooks/useBlog";
import { useMemo } from "react";

interface BlogCardProps {
  post: Article;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { getFallbackSrc } = useBlog();
  const MotionCard = useMemo(() => motion.create(Card), []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      exit={{ opacity: 0, y: 40 }}
    >
      <NavLink to={`/blog/${post.slug}`}>
        <MotionCard className="group backdrop-blur-xs pt-0 bg-background/80 hover:shadow-lg transition-all h-full">
          <motion.div
            className="relative w-full h-48 overflow-hidden rounded-t-lg"
            layoutId={`blog-image-${post.slug}`}
          >
            <img
              src={`${getFallbackSrc(post?.cover?.formats)}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </motion.div>

          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar size={16} />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">
              <motion.span>{post.title}</motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{post.description}</p>
          </CardContent>
          <CardFooter>
            {post.categories.map((category) => (
              <Badge
                key={category.name}
                variant="secondary"
                className="px-3 py-2 rounded-3xl"
              >
                {category.name}
              </Badge>
            ))}
          </CardFooter>
        </MotionCard>
      </NavLink>
    </motion.div>
  );
}
