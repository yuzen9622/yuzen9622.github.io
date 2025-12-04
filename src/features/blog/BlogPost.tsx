import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronLeftIcon, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MarkdownRenderer from "./ui/MarkdownRenderer";
import { useBlogLoader } from "./hooks/useBlogLoader";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { posts } = useBlogLoader();
  const [isExiting, setIsExiting] = useState(false);
  const [content, setContent] = useState("");
  const post = posts.find((p) => p.slug === slug);
  const loadContent = useCallback(async () => {
    if (!post) return "";
    const text = await fetch(`/content/blogs/posts/${slug}.md`).then((res) =>
      res.text()
    );
    return text;
  }, [slug, post]);

  useEffect(() => {
    loadContent().then(setContent);
  }, [loadContent]);

  const handleBack = () => {
    if (document.startViewTransition) {
      setIsExiting(true);
      document.startViewTransition(() => {
        navigate("/blog");
      });
    } else {
      navigate("/blog");
    }
  };

  if (!post) {
    return (
      <div className="  w-full min-h-screen flex items-center justify-center">
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
        text: post.excerpt,
        url: window.location.href,
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key="blog-post"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className=" relative w-full   bg-background pt-20"
        >
          {content ? (
            <motion.div
              layoutId={`blog-card-${post.slug}`}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-11/12 max-w-4xl mx-auto"
              style={{ viewTransitionName: `blog-card-${post.slug}` }}
            >
              <div className="backdrop-blur-xs bg-background/95 flex flex-col p-8 relative space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className=" self-start"
                >
                  <ChevronLeftIcon size={16} />
                  Back
                </Button>

                {post.coverImage && (
                  <motion.div
                    layoutId={`blog-image-${post.slug}`}
                    className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-6"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}

                <motion.div
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h1
                    layoutId={`blog-title-${post.slug}`}
                    className="text-4xl md:text-5xl font-bold"
                  >
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
                      <span>{new Date(post.date).toLocaleDateString()}</span>
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
                    {post.tags.map((tag: string, index: number) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <Badge variant="secondary">{tag}</Badge>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {post.excerpt}
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
                    alt={post.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold">{post.author}</p>
                    <p className="text-sm text-muted-foreground">Developer</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              layoutId={`blog-card-${post.slug}`}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-11/12 max-w-4xl mx-auto"
              style={{ viewTransitionName: `blog-card-${post.slug}` }}
            >
              <div className="backdrop-blur-xs bg-background/95 flex flex-col p-8 relative space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className=" self-start"
                >
                  <ChevronLeftIcon size={16} />
                  Back
                </Button>

                {post.coverImage && (
                  <motion.div
                    layoutId={`blog-image-${post.slug}`}
                    className="w-full h-64 md:h-96 overflow-hidden rounded-lg mb-6"
                  >
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}

                <motion.div
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.h1
                    layoutId={`blog-title-${post.slug}`}
                    className="text-4xl md:text-5xl font-bold"
                  >
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
                      <span>{new Date(post.date).toLocaleDateString()}</span>
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
                    {post.tags.map((tag: string, index: number) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                      >
                        <Badge variant="secondary">{tag}</Badge>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {post.excerpt}
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
