import { targetAudience } from "@/lib/data";

type MinorsPolicyNoticeProps = {
  className?: string;
};

export default function MinorsPolicyNotice({ className = "" }: MinorsPolicyNoticeProps) {
  return (
    <p
      className={`text-xs text-on-surface-variant/85 leading-relaxed ${className}`.trim()}
    >
      <span className="material-symbols-outlined mr-1 align-middle text-sm text-on-surface-variant">
        family_restroom
      </span>
      {targetAudience.familyPolicy}
    </p>
  );
}
