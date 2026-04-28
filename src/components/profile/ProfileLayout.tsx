import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ProfileLayout({ children }: Props) {
  return <section className="space-y-6 py-10">{children}</section>;
}
