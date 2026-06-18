import { Icon } from "@/templates/components/icon";
import { formatCurrency } from "@/utils/formatCurrency";

export type SummaryItem = {
  id: string;
  title: string;
  amount: number;
  icon: string;
  tone: "success" | "error";
};

export type SummariesProps = {
  summaries?: SummaryItem[];
};

type SummaryCardProps = {
  summary: SummaryItem;
};

const summaryToneStyles: Record<SummaryItem["tone"], string> = {
  success: "text-utility-success",
  error: "text-utility-error",
};

export function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <article className="col-span-1 rounded-md ring-1 ring-neutral-light p-3 md:col-span-2 bg-white">
      <div className="flex flex-col gap-1">
        <span className="flex items-center gap-1 label">
          <Icon name={summary.icon} className={["h-4 w-4", summaryToneStyles[summary.tone]].join(" ")} />
          {summary.title}
        </span>
        <span className="text-2xl font-bold text-primary-dark">
          {formatCurrency(summary.amount)}
        </span>
      </div>
    </article>
  );
}

export function Summaries({ summaries = [] }: SummariesProps) {
  return (
    <section id="summaries" className="flex flex-row *:w-full gap-3"> 
      {summaries.map((summary) => (
        <SummaryCard key={summary.id} summary={summary} />
      ))}
    </section>
  );
}
