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

export interface AccountSelectorProps {
  accountType: AccountType;
  balance: number;
  accountNumber: string;
  status: string;
  className?: string;
  accountId: string
}

export function AccountSelector({
  accountType,
  balance,
  accountNumber,
  status,
  className = "",
  accountId,
}: AccountSelectorProps) {
  return ( 

    <a href={`/accounts/${accountId}`} className="border border-neutral-light p-3 rounded flex flex-col justify-center items-start gap-0">
      <div className="flex flex-row items-center gap-4 w-full"> 

        <div
          className={[
            "relative aspect-[1.586/1] w-auto overflow-hidden rounded p-6 shadow-2xl", 
            accountTypeStyles[accountType],
            className,
          ].join(" ")}
        > 
          <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-gradient-to-l from-black/8 to-black/2" />
          <div className="flex flex-col items-center justify-center gap-1 h-full"> 
            <Logo textClassName="text-xs" iconClassName="w-3 h-3" /> 
          </div>
        </div> 

        <div  className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-x-4 w-full" >
          <span className="font-medium col-start-1 row-start-1"> { accountTypeLabels[accountType] } </span>  
          <p className="label col-start-1 row-start-2">{accountNumber}</p> 
          <p className="text-lg font-medium tracking-wide text-right">{formatCurrency(balance)}</p>       
          <p className="label text-right"> Balance </p>      
        </div>        
      </div>


    </a> 
  );
}
