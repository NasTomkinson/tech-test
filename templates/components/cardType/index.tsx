import { Logo } from "@/components/logo";

export type AccountType = "credit" | "savings" | "currentAccount";

const accountTypeStyles: Record<AccountType, string> = {
  credit: "bg-[#ff7f50] text-white",
  savings: "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-950",
  "currentAccount": "bg-primary text-white",
};

const accountTypeLabels: Record<AccountType, string> = {
  credit: "Credit",
  savings: "Savings",
  "currentAccount": "Current Account",
};

export interface CardTypeProps {
  accountType: AccountType;
  balance: string;
  accountNumber: string;
  status: string;
  className?: string;
}

export function CardType({
  accountType,
  balance,
  accountNumber,
  status,
  className = "",
}: CardTypeProps) {
  return (
    <div
      className={[
        "relative aspect-[1.586/1] w-auto min-w-[22rem] overflow-hidden rounded-2xl p-6 shadow-2xl", 
        accountTypeStyles[accountType],
        className,
      ].join(" ")}
    >
      <div className="absolute -bottom-20 -left-12 h-44 w-44 rounded-full bg-black/5" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-1">
            <Logo />
          </div>

          <span  className="italic font-semibold text-sm"> {accountTypeLabels[accountType]} </span>
        </div>

        <div className="mt-8">
          <span className="text-xs uppercase font-medium tracking-wide">Available balance</span>
          <p className="text-2xl font-semibold tracking-wide">{balance}</p>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-medium tracking-wide">
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
