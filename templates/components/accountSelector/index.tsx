import { formatCurrency } from "@/utils/formatCurrency";
import { CardPreview } from "@/components/cardPreview";

export type AccountType = "credit" | "savings" | "currentAccount";

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

    <a href={`/accounts/${accountId}`} className={["border border-neutral-light p-3 rounded flex flex-col justify-center items-start gap-0", className].join(" ")}>
      <div className="flex flex-row items-center gap-4 w-full"> 

        <CardPreview
          accountId={accountId}
          accountNumber={accountNumber}
          accountType={accountType}
          balance={balance}
          status={status}
        />

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
