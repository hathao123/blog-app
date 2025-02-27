"use client";

import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="border-grid sticky top-0 z-50 px-5 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-24 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center" prefetch={false}>
          <span className="text-4xl font-bold">Long.</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
