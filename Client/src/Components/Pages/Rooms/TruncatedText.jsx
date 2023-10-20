export default function TruncateText({ text, limit,className }) {
  const words = text.split(" ");
  const truncatedText = words.slice(0, limit).join(" ");

  return (
    <span className={"font-light"+ className}>
      {truncatedText}
      {words.length > limit && "..."} {/* Show ellipsis if text is truncated */}
    </span>
  );
}
