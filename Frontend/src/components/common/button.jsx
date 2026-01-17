function KioskButton({
  content,
  image,
  onClick,
  bgColor = "#e5745b",
  textColor = "text-black",
}) {
  // WITH IMAGE
  if (image) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          m-10 p10
          flex flex-col w-[280px] overflow-hidden
          rounded-2xl ${textColor}
          shadow-lg transition-transform
          active:scale-95
        `}
        style={{ backgroundColor: bgColor }}
      >
        <div className="h-[180px] w-full overflow-hidden rounded-b-2xl">
          <img src={image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="px-4 py-4 text-sm leading-relaxed">{content}</div>
      </button>
    );
  }

  // WITHOUT IMAGE
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        m-4
        flex items-center justify-center
        w-[260px] h-[320px]
        rounded-3xl ${textColor}
        text-lg font-semibold shadow-lg transition-transform
        active:scale-95
      `}
      style={{ backgroundColor: bgColor }}
    >
      {content}
    </button>
  );
}

export default KioskButton;
