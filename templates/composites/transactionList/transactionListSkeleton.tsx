function TransactionListSkeletonRow() {
  return (
    <article className="flex items-center gap-3 p-2">
      <div className="aspect-[1.586/1] w-18 shrink-0 animate-pulse rounded bg-neutral-light" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="h-4 w-40 max-w-full animate-pulse rounded bg-neutral-light" />
        <div className="h-3 w-28 animate-pulse rounded bg-neutral-light" />
      </div>
      <div className="h-5 w-20 animate-pulse rounded bg-neutral-light" />
    </article>
  );
}

export function TransactionListSkeleton({
  hasControls = true,
  rowCount = 8,
}: {
  hasControls?: boolean;
  rowCount?: number;
}) {
  return (
    <section aria-hidden="true" className="relative flex flex-col gap-3 bg-white">
      {hasControls ? (
        <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-2 bg-white py-4">
          <div className="col-span-full h-10 animate-pulse rounded border border-neutral-light bg-neutral-light/60" />
          <div className="h-10 animate-pulse rounded border border-neutral-light bg-neutral-light/60" />
          <div className="h-10 animate-pulse rounded border border-neutral-light bg-neutral-light/60" />
        </div>
      ) : null}
      <div className="divide-y divide-neutral-light rounded-md bg-white">
        {Array.from({ length: rowCount }, (_, index) => (
          <TransactionListSkeletonRow key={index} />
        ))}
      </div>
    </section>
  );
}
