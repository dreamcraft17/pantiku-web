"use client";

import Image from "next/image";
import Link from "next/link";

type LogoSize = "small" | "medium" | "large";

type Props = {
  size?: LogoSize;
  className?: string;
  linked?: boolean;
  priority?: boolean;
};

const sizeMap: Record<LogoSize, { width: number; height: number }> = {
  small: { width: 88, height: 32 },
  medium: { width: 120, height: 40 },
  large: { width: 160, height: 56 }
};

export function Logo({ size = "medium", className, linked = false, priority = false }: Props) {
  const dimensions = sizeMap[size];
  const image = (
    <Image
      src="/Logo/logo.png"
      alt="Pantiku Logo"
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={className}
      style={{ height: "auto", width: "auto", maxWidth: "100%" }}
    />
  );

  if (linked) {
    return <Link href="/">{image}</Link>;
  }

  return image;
}
