import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";

import "katex/dist/katex.min.css";

import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyList,
  TypographyP,
  TypographyTable,
  TypographyTbody,
  TypographyTd,
  TypographyTh,
  TypographyTr,
} from "./Typography";
import { CodeBlock } from "./CodeBlock";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface MarkdownRendererProps {
  content: string;
  className?: string;
  setHeadingId: (id: string) => void;
}

export default function MarkdownRenderer({
  content,
  setHeadingId,
}: MarkdownRendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeSlug, rehypeKatex, rehypeRaw]}
      components={{
        h1: ({ ...props }) => {
          return <TypographyH1 setHeadingId={setHeadingId} {...props} />;
        },
        h2: ({ ...props }) => {
          return <TypographyH2 setHeadingId={setHeadingId} {...props} />;
        },
        h3: ({ ...props }) => {
          return <TypographyH3 setHeadingId={setHeadingId} {...props} />;
        },
        p: ({ children }) => <TypographyP>{children}</TypographyP>,
        code: ({ className = "", children, ...props }) => {
          return (
            <CodeBlock className={className} {...props}>
              {children}
            </CodeBlock>
          );
        },
        pre: ({ children }) => children as React.ReactElement,
        a: ({ href, children }) => (
          <a
            href={href}
            className=" hover:underline text-primary"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
            <ArrowUpRightIcon className="inline " size={14} />
          </a>
        ),
        ul: ({ children }) => <TypographyList>{children}</TypographyList>,

        ol: ({ children }) => (
          <ol className="list-decimal list-inside my-4 space-y-2">
            {children}
          </ol>
        ),
        blockquote: ({ children }) => (
          <TypographyBlockquote>{children}</TypographyBlockquote>
        ),
        table: ({ children }) => <TypographyTable>{children}</TypographyTable>,
        tbody: ({ children }) => <TypographyTbody>{children}</TypographyTbody>,
        tr: ({ children }) => <TypographyTr>{children}</TypographyTr>,
        th: ({ children }) => <TypographyTh>{children}</TypographyTh>,
        td: ({ children }) => <TypographyTd>{children}</TypographyTd>,
        input: ({ type, disabled, checked, ...props }) => {
          if (type === "checkbox")
            return (
              <Checkbox
                checked={checked}
                className=" disabled:opacity-100"
                disabled={disabled}
              />
            );
          return <input type={type} {...props} />;
        },
        img: ({ ...props }) => {
          return <img className=" rounded-md " {...props} />;
        },
        hr: ({ ...props }) => {
          return <Separator className="my-6" {...props} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
