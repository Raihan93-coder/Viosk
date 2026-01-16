function KioskButton({ content, image, onClick }) {
  // WITH IMAGE
  if (image) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="
          m-4
          flex flex-col w-[280px] overflow-hidden
          rounded-2xl bg-[#e5745b] text-black
          shadow-lg transition-transform
          active:scale-95
        "
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
      className="
        m-4
        flex items-center justify-center
        w-[280px] py-4
        rounded-2xl bg-[#e5745b] text-black
        text-base shadow-lg transition-transform
        active:scale-95
      "
    >
      {content}
    </button>
  );
}

export default KioskButton;
