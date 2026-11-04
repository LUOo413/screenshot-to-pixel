import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: "summary" | "summary_large_image";
};

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function usePageMeta({ title, description, ogTitle, ogDescription, twitterCard }: PageMeta) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", ogTitle);
    setMeta("property", "og:description", ogDescription);
    setMeta("name", "twitter:card", twitterCard);
  }, [title, description, ogTitle, ogDescription, twitterCard]);
}
