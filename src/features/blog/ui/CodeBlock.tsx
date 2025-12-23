import { useMemo, useState } from "react";
import { TypographyInlineCode } from "./Typography";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CheckIcon, CopyIcon } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkCold,
  coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { useTheme } from "@/shared/hook/useTheme";
import React from "react";

interface NotionCodeBlockProps {
  className?: string;
  children: React.ReactNode;
  file?: string;
}
export function CodeBlock({
  className = "",
  children,
  file,
}: NotionCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  const language = useMemo(() => {
    const match = /language-([a-z0-9+-]+)/i.exec(className);
    return match ? match[1] : null;
  }, [className]);

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

  if (!language) return <TypographyInlineCode>{children}</TypographyInlineCode>;

  return (
    <pre className=" relative  text-sm   rounded-3xl ">
      <div className="absolute  top-1.5 right-2   flex gap-2 text-xs">
        {file && (
          <pre className="px-3 py-2 backdrop-blur-md  rounded-3xl transition">
            {file}
          </pre>
        )}
        {language && (
          <pre className="px-3 py-2 backdrop-blur-md   rounded-3xl transition">
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
              type="button"
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
        style={isDark ? coldarkDark : coldarkCold}
        language={language}
        className=" rounded-md border text-base text-inherit! py-7!"
        useInlineStyles={true}
        showLineNumbers
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    </pre>
  );
}
