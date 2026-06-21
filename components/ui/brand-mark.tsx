import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  showName?: boolean;
  className?: string;
  markClassName?: string;
  iconClassName?: string;
};

export function BrandMark({
  showName = true,
  className,
  markClassName,
  iconClassName,
}: BrandMarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#27255f] shadow-md shadow-[#27255f]/20",
          markClassName
        )}
      >
        <Crown
          aria-hidden="true"
          strokeWidth={2.25}
          className={cn("h-6 w-6 text-[#ece825]", iconClassName)}
        />
      </span>
      {showName && (
        <span className="text-lg font-bold tracking-tight text-[#27255f] sm:text-xl">
          paysmallsmall
        </span>
      )}
    </span>
  );
}
