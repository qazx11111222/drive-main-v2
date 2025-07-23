"use client";
import { useRouter } from "next/navigation";

export function NavLink({ href, children, ...props }: { href: string, children: React.ReactNode, [key: string]: any }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setTimeout(() => {
      router.push(href);
    }, 100); // 0.1秒遅延のみ
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
} 