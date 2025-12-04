import { useState } from "react";
import { TypographyInlineCode } from "./Typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CheckIcon, CopyIcon } from "lucide-react";

import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import github from "react-syntax-highlighter/dist/esm/styles/hljs/github";
import darcula from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night";
import { useTheme } from "@/shared/hook/useTheme";
import React from "react";

interface NotionCodeBlockProps {
  className?: string;
  children: React.ReactNode;
}
export function CodeBlock({ className = "", children }: NotionCodeBlockProps) {
  const match = /language-(\w+)/.exec(className);
  const language = match ? match[1] : null;
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  const handleCopy = async () => {
    if (typeof children === "string" || Array.isArray(children)) {
      const text = Array.isArray(children) ? children.join("") : children;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (err) {
        console.error("Copy failed", err);
      }
    }
  };
  const codeString = React.Children.toArray(children)
    .map((child) => (typeof child === "string" ? child : ""))
    .join("");

  if (!language) return <TypographyInlineCode>{children}</TypographyInlineCode>;

  return (
    <pre className=" relative p-2 text-sm  rounded-3xl ">
      <div className="absolute  right-6 top-6 flex gap-2 text-xs">
        {language && (
          <pre className="px-3 py-2 backdrop-blur-md  text-primary rounded-3xl transition">
            {language}
          </pre>
        )}

        {copied ? (
          <Tooltip>
            <TooltipTrigger className=" p-1 text-green-400  backdrop-blur-md  rounded-3xl transition">
              <CheckIcon size={16} />
            </TooltipTrigger>
            <TooltipContent>Copied!</TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className=" p-1  backdrop-blur-md  rounded-3xl transition"
              >
                <CopyIcon size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>Copy</TooltipContent>
          </Tooltip>
        )}
      </div>
      <SyntaxHighlighter
        style={isDark ? darcula : github}
        language={language}
        className=" rounded-md border text-base"
        useInlineStyles={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </pre>
  );
}
