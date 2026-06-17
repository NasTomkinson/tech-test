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
        "relative aspect-[2.4/1]  overflow-hidden rounded-2xl p-6 shadow-2xl w-full mx-auto", 
        accountTypeStyles[accountType],
        className,
      ].join(" ")}
    >
          <div className="absolute -bottom-12 -left-8 h-48 w-48 rounded-full bg-gradient-to-l from-black/8 to-black/2" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex justify-between items-center"> 
          
          <div className="flex flex-col items-start justify-center">
            <div className="flex flex-row items-center gap-1">
              <Logo />
            </div>

            <span  className="italic font-semibold text-sm"> {accountTypeLabels[accountType]} </span>
          </div>

          <div className=" ">
            <p className="text-3xl font-semibold tracking-wide">{formatCurrency(balance)}</p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-xs">
              Account number
            </span>
            <p className="font-mono text-sm tracking-wide">{accountNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide opacity-75">{status}</p>
          </div>
        </div>
      </div>
    </div> 
  );
}
