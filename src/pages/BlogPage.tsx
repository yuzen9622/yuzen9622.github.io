import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BlogList from "@/features/blog/BlogList";
import BlogPost from "@/features/blog/BlogPost";
import "@/features/blog/styles/blog-transitions.css";
import useBlog from "@/features/blog/hooks/useBlog";

export default function BlogPage() {
  const { slug } = useParams();
  const { posts } = useBlog();
  console.log(posts, slug);
  const post = posts?.find((p) => p.slug === slug);
  return (
    <>
      <Helmet>
        <title>{post ? post.title : "Yuzen - Blog"}</title>
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
