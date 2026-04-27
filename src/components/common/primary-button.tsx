import Link from "next/link";
import { ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type Props = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline";
  icon?: ReactNode;
};

export function PrimaryButton({ label, href, onClick, variant = "default", icon }: Props) {
  if (href) {
    return (
      <Link href={href} className={cn(buttonVariants({ variant, size: "lg" }), "gap-2")}>
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <Button onClick={onClick} variant={variant} size="lg" className="gap-2">
      {icon}
      {label}
    </Button>
  );
}
