import { cn } from "@/lib/utils";

export function CircleProgressBar({ className, value, ...props }) {
  return (
    <div className={cn("relative mr-5", className)} {...props}>
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={`stroke-current ${
            value === 100
              ? "text-green-400 dark:text-green-400"
              : "text-light-brown dark:text-light-brown"
          } `}
          strokeWidth="3"
        ></circle>
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200 dark:text-neutral-700"
          strokeWidth="2"
          strokeDasharray="100"
          strokeDashoffset={value}
          strokeLinecap="round"
        ></circle>
      </svg>

      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <span
          className={`text-center text-md font-bold ${
            value === 100
              ? "text-green-400 dark:text-green-400 text-xs"
              : "text-light-brown dark:text-light-brown"
          }`}
        >
          {value}%
        </span>
      </div>
    </div>
  );
}
