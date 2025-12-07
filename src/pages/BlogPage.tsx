// src/pages/BlogPage.tsx
import { Helmet } from "react-helmet";
import { Outlet, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import BlogList from "@/features/blog/BlogList";
import BlogPost from "@/features/blog/BlogPost";
import GlitchText from "@/components/gsap/text/GlitchText";
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
        <Outlet />
      </AnimatePresence>

      <div key="blog-list" className=" relative w-full min-h-screen pt-20">
        {/* Header */}
        <div className="w-full h-[33dvh] flex flex-col gap-10 items-center justify-center">
          <GlitchText
            speed={0.5}
            enableShadows
            className="text-black! dark:text-white! text-5xl"
          >
            Blog
          </GlitchText>
          <p className="text-xl text-muted-foreground text-center max-w-2xl px-4">
            這裡是我分享技術文章和心得的地方，希望你能在這裡找到有用的資訊！
          </p>
        </div>
        <BlogList />
      </div>
    </>
  );
}
