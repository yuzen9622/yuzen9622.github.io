// src/features/blog/BlogCard.tsx
import { Calendar } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BlogPost } from "./types/blog";
import { motion } from "framer-motion";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layoutId={`blog-card-${post.slug}`}
    >
      <NavLink to={`/blog/${post.slug}`}>
        <Card
          className="group backdrop-blur-xs pt-0 bg-background/80 hover:shadow-lg transition-all h-full"
          style={{ viewTransitionName: `blog-card-${post.slug}` }}
        >
          {post.coverImage && (
            <motion.div
              className="relative w-full h-48 overflow-hidden rounded-t-lg"
              layoutId={`blog-image-${post.slug}`}
            >
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </motion.div>
          )}
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar size={16} />
              <span>{new Date(post.date).toLocaleDateString()}</span>
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">
              <motion.span layoutId={`blog-title-${post.slug}`}>
                {post.title}
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </NavLink>
    </motion.div>
  );
}
