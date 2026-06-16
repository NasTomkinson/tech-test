"use client";

import type { MouseEventHandler } from "react";

import { Icon } from "@/components/icon";

export interface QuickActionProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function QuickAction({
  title,
  description,
  icon,
  href,
  className = "",
  disabled = false,
  onClick,
}: QuickActionProps) {
  const content = (
    <>
      <Icon name={icon} className="h-8 w-8 shrink-0 text-primary" />
      <span className="min-w-0 gap-0 flex flex-col">
        <span className="block text-sm font-semibold text-gray-950">{title}</span>
        <span className="block text-sm text-gray-600">{description}</span>
      </span>
    </>
  );

  const sharedClassName = [
    "group flex w-full min-w-64 items-center gap-3 text-left", 
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    disabled ? "cursor-not-allowed opacity-50 hover:translate-y-0 hover:shadow-sm" : "",
    className,
  ].join(" ");

  if (href) {
    return (
      <a
        className={sharedClassName}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={sharedClassName}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
