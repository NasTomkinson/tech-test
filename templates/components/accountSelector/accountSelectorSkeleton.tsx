export function AccountSelectorSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "border border-neutral-light p-3 rounded flex flex-col justify-center items-start gap-0",
        className,
      ].join(" ")}
    >
      <div className="flex w-full flex-row items-center gap-4">
        <div className="aspect-[1.586/1] w-28 shrink-0 animate-pulse rounded bg-neutral-light" />
        <div className="grid w-full grid-cols-[auto_auto] grid-rows-[auto_auto] gap-x-4 gap-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-neutral-light" />
          <div className="col-start-1 row-start-2 h-3 w-20 animate-pulse rounded bg-neutral-light" />
          <div className="justify-self-end h-5 w-24 animate-pulse rounded bg-neutral-light" />
          <div className="justify-self-end h-3 w-12 animate-pulse rounded bg-neutral-light" />
        </div>
      </div>
    </div>
  );
}
