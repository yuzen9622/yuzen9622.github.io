// src/pages/BlogPage.tsx
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BlogList from "@/features/blog/BlogList";
import BlogPost from "@/features/blog/BlogPost";
import "@/features/blog/styles/blog-transitions.css";

export default function BlogPage() {
  const { slug } = useParams();

  return (
    <>
      <Helmet>
        <title>Yuzen - Blog{slug ? ` - ${slug}` : ""}</title>
      </Helmet>

      <AnimatePresence mode="wait">
        {slug && <BlogPost key={slug} />}
      </AnimatePresence>

      <div key="blog-list" className=" relative w-full min-h-screen pt-20">
        <BlogList />
      </div>
    </>
  );
}
