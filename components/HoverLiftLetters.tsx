type HoverLiftLettersProps = {
  text: string;
  className?: string;
  charClassName?: string;
};

export default function HoverLiftLetters({
  text,
  className = "",
  charClassName = "",
}: HoverLiftLettersProps) {
  return (
    <span className={`hover-lift-letters ${className}`.trim()}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className={`hover-lift-letters__char ${charClassName}`.trim()}
          style={{ transitionDelay: `${index * 28}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
