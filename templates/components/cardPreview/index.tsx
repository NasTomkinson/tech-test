import { Logo } from "@/components/logo";
import { formatCurrency } from "@/utils/formatCurrency";

export type AccountType = "credit" | "savings" | "currentAccount";

const accountTypeStyles: Record<AccountType, string> = {
  credit: "bg-[#ff7f50] text-white",
  savings: "bg-white bg-gradient-to-r from-neutral-light/20 to-neutral/20 text-primary-dark",
  "currentAccount": "bg-primary-dark text-white",
};

const accountTypeLabels: Record<AccountType, string> = {
  credit: "Credit",
  savings: "Savings",
  "currentAccount": "Current Account",
};

export interface CardPreviewProps {
  accountType: AccountType;
  balance: number;
  accountNumber: string;
  status: string;
  className?: string;
  accountId: string
}

export function CardPreview({
  accountType,
  balance,
  accountNumber,
  status,
  className = "",
  accountId,
}: CardPreviewProps) {
  return (
    <div
      className={[
        "relative aspect-[1.586/1] w-28 overflow-hidden rounded p-6 shadow-2xl", 
        accountTypeStyles[accountType],
        className,
      ].join(" ")}
    > 
      <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-gradient-to-l from-black/8 to-black/2" />
      <div className="flex flex-col items-center justify-center gap-1 h-full"> 
        <Logo textClassName="text-xs" iconClassName="w-3 h-3" /> 
      </div>
    </div> 
  );
}
