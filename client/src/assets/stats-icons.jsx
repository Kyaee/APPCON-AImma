import { cn } from "@/lib/utils";

export function GemIcon({className, ...props}) {
  return (
    <div className={cn("w-6 h-6", className)} {...props}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="28" height="28" fill="url(#pattern0_4829_925)" />
        <path
          d="M7.49996 3.25H20.5L24.8333 9.75L14 23.8333L3.16663 9.75L7.49996 3.25Z"
          stroke="#020617"
          strokeWidth="0.8"  
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 23.8333L18.3333 9.75L15.0833 3.25"
          stroke="#020617"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 23.8333L9.66663 9.75L12.9166 3.25"
          stroke="#020617"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.16663 9.75H24.8333"
          stroke="#020617"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <pattern
            id="pattern0_4829_925"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_4829_925" transform="scale(0.01)" />
          </pattern>
          <image
            id="image0_4829_925"
            width="100"
            height="100"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </div>
  );
}

export function HeartIcon({className, ...props}) {
  return (
    <div className={cn("w-6 h-6", className)} {...props}>
      <svg
        width="26"
        height="27"
        viewBox="0 0 26 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="26" height="26" fill="url(#pattern0_4829_924)" />
        <path
          d="M22.2708 5.9617C21.7482 5.41633 21.1273 4.9836 20.4435 4.68834C19.7598 4.39308 19.0268 4.24109 18.2864 4.24109C17.5461 4.24109 16.8131 4.39308 16.1293 4.68834C15.4456 4.9836 14.8246 5.41633 14.3021 5.9617L13.5 6.8067L12.6979 5.9617C12.1753 5.41633 11.5543 4.9836 10.8706 4.68834C10.1869 4.39308 9.45384 4.24109 8.71351 4.24109C7.97318 4.24109 7.24013 4.39308 6.5564 4.68834C5.87268 4.9836 5.25172 5.41633 4.72913 5.9617C2.5208 8.25837 2.38538 12.1367 5.16663 15.0834L13.5 23.75L21.8333 15.0834C24.6145 12.1367 24.4791 8.25837 22.2708 5.9617Z"
          stroke="#020617"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <pattern
            id="pattern0_4829_924"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_4829_924" transform="scale(0.01)" />
          </pattern>
          <image
            id="image0_4829_924"
            width="100"
            height="100"
            preserveAspectRatio="none"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </div>
  );
}