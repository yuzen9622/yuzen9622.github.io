import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  ChevronLeftIcon,
  Loader2,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MarkdownRenderer from "./ui/MarkdownRenderer";

import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "./types/blog";
import useBlog from "./hooks/useBlog";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { posts, loading, getFallbackSrc } = useBlog();

  const [content, setContent] = useState<string | null>(null);
  const post = posts?.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) setContent(post.content);
  }, [post]);

  const handleBack = () => {
    if (document.startViewTransition) {
      window.scrollTo(0, 0);
      document.startViewTransition(() => {
        navigate("/blog");
      });
    } else {
      window.scrollTo(0, 0);
      navigate("/blog");
    }
  };
  if (loading) {
    return (
      <div className=" absolute  w-full min-h-screen h-full bg-background z-10 ">
        <div className=" fixed w-full h-screen flex items-center justify-center">
          <Loader2 className="animate-spin" size={48} />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className=" absolute  w-full min-h-screen h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Button onClick={handleBack}>
            <ArrowLeft size={16} />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="blog-post"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // transition={{ duration: 0.3 }}
        className="   absolute  inset-0 min-h-full h-fit z-10 bg-background pt-20"
      >
        {content ? (
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-11/12 max-w-4xl mx-auto"
          >
            <div className="backdrop-blur-xs bg-background/95 flex flex-col p-8 relative space-y-2">
              <div className="  sticky top-4 z-20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className=" self-start backdrop-blur-2xl "
                >
                  <ChevronLeftIcon size={16} />
                  Back
                </Button>
              </div>

              <motion.div
                layoutId={`blog-image-${post.slug}`}
                className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-6"
              >
                <img
                  src={`${getFallbackSrc(post?.cover?.formats)}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                className="space-y-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1 className="text-4xl md:text-5xl font-bold">
                  {post.title}
                </motion.h1>

                <motion.div
                  className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 size={16} />
                    Share
                  </Button>
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {post.categories.map((category: Category, index: number) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                    >
                      <Badge variant="secondary">{category.name}</Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.p
                  className="text-lg text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {post.description}
                </motion.p>
              </motion.div>

              <motion.div className="space-y-2">
                <MarkdownRenderer content={content} />
              </motion.div>

              <Separator className="my-4" />

              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <img
                  src="/avatar.webp"
                  alt={post.author?.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-bold">{post.author?.name}</p>
                  <p className="text-sm text-muted-foreground">Developer</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div className="w-full min-h-screen h-full flex items-center justify-center"></div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
