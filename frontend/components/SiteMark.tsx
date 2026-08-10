"use client";

/** Signature “G” / glass-shard mark used as favicon motif + nav home. */
export default function SiteMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="gGrad" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e8a05c" />
          <stop offset="0.55" stopColor="#c45c26" />
          <stop offset="1" stopColor="#9db4c8" />
        </linearGradient>
      </defs>
      <path
        d="M32 6C18 6 8 17 8 32c0 14 10 26 24 26 9 0 17-4 21-11l-7-5c-2.5 4-7 7-14 7-9 0-15-7-15-17S23 15 32 15c6 0 11 2 14 6l-9 6h18V8l-6 4C45 7 39 6 32 6Z"
        fill="url(#gGrad)"
        opacity="0.95"
      />
      <path
        d="M22 34h16"
        stroke="#e8dcc8"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
