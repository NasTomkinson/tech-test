import Image from "next/image";

import { Icon } from "@/templates/components/icon";

export type HeaderUser = {
  name: string;
  avatarUrl: string;
  avatarAlt?: string;
};

export type HeaderProps = {
  user: HeaderUser;
  notificationCount?: number;
};

export function Header({ user, notificationCount = 0 }: HeaderProps) {
  const visibleNotificationCount =
    notificationCount > 9 ? "9+" : notificationCount.toString();
  const hasNotifications = notificationCount > 0;

  return (
    <header className="sticky top-0 z-999 bg-primary-dark text-white h-16">
      <div className="container flex w-full items-center justify-between gap-4 h-full">

      <div className="flex min-w-0 items-center gap-3">
        <Image
          src={user.avatarUrl}
          alt={user.avatarAlt ?? `${user.name} avatar`}
          width={44}
          height={44}
          unoptimized
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />
        <span className="min-w-0 truncate text-base font-semibold text-white">
          {user.name}
        </span>
      </div>

      <button
        type="button"
        aria-label={
          hasNotifications
            ? `${notificationCount} unread notifications`
            : "No unread notifications"
        }
        className="relative"
      >
        <Icon name="mdi:bell-outline" className="h-6 w-6 text-white" />
        {hasNotifications ? (
          <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-utility-error px-1 text-[12px]  leading-none text-white ring ring-white">
            {visibleNotificationCount}
          </span>
        ) : null}
      </button>
      </div>
    </header>
  );
}
