"use client";

import { useTransition } from "@/context/TransitionContext";

const TransitionLink = ({
  href,
  children,
  className,
  onClick,
  draggable,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  draggable?: boolean;
}) => {
  const { navigateTo } = useTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    navigateTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} draggable={draggable}>
      {children}
    </a>
  );
};

export default TransitionLink;
