import { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow" | "full";
};

const sizeClassMap: Record<NonNullable<PageContainerProps["size"]>, string> = {
  default: "max-w-[1280px]",
  wide: "max-w-[1536px]",
  narrow: "max-w-[960px]",
  full: "max-w-none",
};

export function PageContainer({ children, className = "", size = "default" }: PageContainerProps) {
  return <div className={`mx-auto w-full px-4 sm:px-6 lg:px-10 xl:px-12 ${sizeClassMap[size]} ${className}`.trim()}>{children}</div>;
}
