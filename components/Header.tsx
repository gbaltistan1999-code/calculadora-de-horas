import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import logo from "@/public/logo.png";
import { SiteNav } from "./SiteNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-paper">
      <div className="relative mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="inline-flex shrink-0 items-center" aria-label={`${siteConfig.name} — página inicial`}>
          <Image src={logo} alt={siteConfig.name} priority className="h-10 w-auto" sizes="154px" />
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
