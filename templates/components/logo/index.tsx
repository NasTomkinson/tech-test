import { Icon } from "@/components/icon";

export interface LogoProps {
  horizontal?: boolean;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

export function Logo({
  horizontal = true,
  className = "",
  iconClassName = "",
  textClassName = "",
}: LogoProps) {
  return (
    <div
      className={[
        "inline-flex text-inherit",
        horizontal ? "flex-row items-center gap-1" : "flex-col items-start gap-1",
        className,
      ].join(" ")}
    >
      <Icon
        name="streamline-cyber:origami-paper-bird"
        className={["h-5 w-5", iconClassName].join(" ")}
      />
      <span className={["text-lg font-semibold italic", textClassName].join(" ")}>
        EagleBank
      </span>
    </div>
  );
}
