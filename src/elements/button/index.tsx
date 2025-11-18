export default function Button({
  variant,
  btnText,
  btnTextSize,
  btnIcon,
  clickEvent,
  widthUtilities = "w-full",
  roundUtilities = "rounded-sm",
  paddingUtilities = "px-4 py-2",
}: {
  variant: string;
  btnTextSize?: string;
  btnText?: string;
  btnIcon?: any;
  clickEvent?: () => void;
  widthUtilities?: string;
  roundUtilities?: string;
  paddingUtilities?: string;
}) {
  const hoverClasses: Record<string, string> = {
    "rounded": "hover:rounded",
    "rounded-md": "hover:rounded-md",
    "rounded-lg": "hover:rounded-lg",
    "rounded-full": "hover:rounded-full",
  };

  const hoverEffect = hoverClasses[roundUtilities] || "";
  return (
    <button
      type="button"
      className={`btn btn-${variant} ${btnTextSize} ${widthUtilities} ${roundUtilities} ${paddingUtilities} ${hoverEffect}`}
      onClick={clickEvent}
    >
      {btnIcon && btnIcon}
      {btnText && <span>{btnText}</span>}
    </button>
  );
}
