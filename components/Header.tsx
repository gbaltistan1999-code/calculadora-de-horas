import Link from "next/link";
import { Clock } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { SiteNav } from "./SiteNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-paper">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 font-bold tracking-tight text-charcoal">
          <Clock aria-hidden className="h-5 w-5 text-accent" strokeWidth={2.25} />
          <span className="text-[1.05rem]">{siteConfig.name}</span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
