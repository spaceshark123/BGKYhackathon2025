interface FadeTextProps {
  text: string
  className?: string
}

export default function FadeText({ text, className = "" }: FadeTextProps) {
  return (
    <span
      className={`relative inline-block max-w-full whitespace-nowrap overflow-hidden text-ellipsis ${className}`}
    >
      <span
        className="block overflow-hidden text-ellipsis whitespace-nowrap"
        style={{
          maskImage: "linear-gradient(to right, black 85%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 85%, transparent 100%)",
        }}
      >
        {text}
      </span>
    </span>
  )
}