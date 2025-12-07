import { useContext } from "react";
import BlogContextProvider from "../provider/BlogContextProvider";
export default function useBlog() {
  const context = useContext(BlogContextProvider);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
