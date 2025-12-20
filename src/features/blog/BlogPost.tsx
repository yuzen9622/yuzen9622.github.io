import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  ChevronLeftIcon,
  Loader2,
  MoonIcon,
  Share2,
  SunIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MarkdownRenderer from "./ui/MarkdownRenderer";

import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "./types/blog";
import useBlog from "./hooks/useBlog";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/shared/hook/useTheme";
import { LanguageSelector } from "@/components/shared/LangSwitch";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
export default function BlogPost() {
  const { slug, lng } = useParams<{ slug: string; lng: string }>();
  const navigate = useNavigate();
  const { posts, loading, getFallbackSrc } = useBlog();
  const { t } = useTranslation();
  const [content, setContent] = useState<string | null>(null);
  const post = posts?.find((p) => p.slug === slug);
  const { isDark, setTheme } = useTheme();

  useEffect(() => {
    if (post) setContent(post.content);
  }, [post]);

  const handleBack = () => {
    if (document.startViewTransition) {
      window.scrollTo(0, 0);
      document.startViewTransition(() => {
        navigate(`/${lng}/blog`);
      });
    } else {
      window.scrollTo(0, 0);
      navigate(`/${lng}/blog`);
    }
  };

  if (loading) {
    return (
      <div className=" fixed w-full h-screen flex items-center   bg-background z-10  justify-center">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className=" fixed  w-full  h-full overflow-hidden bg-background z-30 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {t("blog:blog.postNotFound")}
          </h1>
          <Button onClick={handleBack}>
            <ArrowLeft size={16} />
            {t("blog:blog.backToBlog")}
          </Button>
        </div>
      </div>
    );
  }

  if (!post.isPublished) {
    toast.info(`「${post.title}」${t("toast:toast.NotPublished")}`, {
      duration: 3000,
    });
    navigate(`/${lng}/blog`);
    return null;
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
    <>
      <Helmet>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={getFallbackSrc(post?.cover?.formats)}
        />
      </Helmet>
      <AnimatePresence mode="wait">
        <motion.div
          key="blog-post"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="   fixed  inset-0 max-h-dvh z-30 bg-background md:p-4 overflow-y-auto"
        >
          {content ? (
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:w-11/12 max-w-4xl mx-auto  "
            >
              <div className=" fixed  top-6 z-20  w-full  max-w-4xl mx-auto ">
                <div className="w-11/12 justify-between mx-auto flex items-center ">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className=" self-start backdrop-blur-2xl hover:bg-primary hover:text-white px-3 bg-background/50 py-2 rounded-3xl "
                  >
                    <ChevronLeftIcon size={16} />
                    Back
                  </Button>
                  <div className="space-x-2 bg-background/50 p-1 rounded-3xl backdrop-blur-md">
                    <button
                      type="button"
                      onClick={() => {
                        setTheme(isDark ? "light" : "dark");
                      }}
                      className=" relative p-2   rounded-3xl  cursor-pointer hover:text-background hover:before:scale-100 before:transition-all before:absolute before:scale-50 before:opacity-0  hover:before:opacity-100 before:rounded-3xl before:inset-0 before:w-full before:h-full  before:-z-20 before:bg-primary"
                    >
                      {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                    </button>
                    <button type="button" className="relative">
                      <LanguageSelector />
                    </button>
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-xs bg-background/95 flex flex-col  relative space-y-2 ">
                <motion.div
                  layoutId={`blog-image-${post.slug}`}
                  className="relative w-full h-72 md:h-112 overflow-hidden  mb-6"
                >
                  <img
                    src={`${getFallbackSrc(post?.cover?.formats)}`}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover object-bottom"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/35 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                    <motion.h1
                      className="text-3xl md:text-5xl font-extrabold leading-tight"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {post.title}
                    </motion.h1>

                    <motion.p
                      className="mt-3 max-w-2xl text-sm md:text-lg font-semibold text-muted-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                    >
                      {post.description}
                    </motion.p>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="flex flex-wrap p-2 items-center gap-4 text-sm text-muted-foreground"
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
                    className="flex flex-wrap gap-2 p-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {post.categories.map(
                      (category: Category, index: number) => (
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                        >
                          <Badge variant="secondary">{category.name}</Badge>
                        </motion.div>
                      )
                    )}
                  </motion.div>
                </motion.div>

                <motion.div className="space-y-2 p-2">
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
    </>
  );
}
