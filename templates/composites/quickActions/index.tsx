import { Icon } from "@/templates/components/icon";

export type QuickActionItem = {
  id: string;
  title: string;
  icon: string;
  href: string;
};

export type QuickActionsProps = {
  actions?: QuickActionItem[];
};

type QuickActionCardProps = {
  action: QuickActionItem;
};

export function QuickActionCard({ action }: QuickActionCardProps) {
  return (
    <a
      href={action.href}
      title={action.title}
      className="col-span-1 flex min-h-14 items-center gap-2 rounded border border-neutral-light p-2 text-neutral-dark"
    >
      <Icon name={action.icon} className="h-10 w-10 rounded-lg bg-primary-light/30 p-1 text-primary-dark" />
      <span className="min-w-0 text-sm leading-tight">{action.title}</span>
    </a>
  );
}

export function QuickActions({ actions = [] }: QuickActionsProps) {
  return (
    <section id="quick-actions" className="col-span-full grid grid-cols-subgrid gap-3">
      <h2 className="col-span-full font-semibold">Quick actions</h2>
      {actions.map((action) => (
        <QuickActionCard key={action.id} action={action} />
      ))}
    </section>
  );
}
