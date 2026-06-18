export type AccountType = "credit" | "savings" | "currentAccount";

const accountTypeStyles: Record<AccountType, string> = {
  credit: "bg-[#ff7f50] text-white",
  savings: "bg-white bg-gradient-to-r from-neutral-light/20 to-neutral/20 text-primary-dark",
  "currentAccount": "bg-primary-dark text-white",
};

export interface CardPreviewProps {
  accountType: AccountType;
  balance: number;
  accountNumber: string;
  status: string;
  className?: string;
  accountId: string;
}

export function CardPreview({
  accountType,
  className = "",
  accountId,
}: CardPreviewProps) {
  return (
    <div
      data-account-id={accountId}
      className={[
        "relative aspect-[1.586/1] w-28 overflow-hidden rounded shadow-2xl",
        accountTypeStyles[accountType],
        className,
      ].join(" ")}
    >
      <svg
        aria-hidden="true"
        className="h-full w-full"
        viewBox="0 0 158.6 100"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle
          cx="22"
          cy="104"
          r="42"
          fill="currentColor"
          opacity="0.1"
        />

        <g transform="translate(20 38) scale(1.25)">
          <g
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.8"
            transform="scale(0.62)"
          >
            <path d="m9.109 9.578-4.783-2.34L.5 11.5h5.246l.493 7.217L17.717 23.5zm0 0L18.191 1.5L14.317 18" />
            <path d="m17.042 6.391 5.458-2.5-7.698 14.895M4.326 7.239l1.42 4.26m.494 7.217l2.869-9.138" />
          </g>
          <text
            x="20"
            y="10.7"
            fill="currentColor"
            fontFamily="inherit"
            fontSize="12"
            fontStyle="italic"
            fontWeight="700"
          >
            EagleBank
          </text>
        </g>
      </svg>
    </div>
  );
}
