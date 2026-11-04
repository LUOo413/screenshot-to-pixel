import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export function SiteHeader({ right }: { right?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-bold tracking-tight">
          Video <span className="text-gradient">Speed Reader</span>
        </Link>
        {right ?? (
          <Button variant="hero" asChild>
            <Link to="/auth">Sign in / 登入</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
