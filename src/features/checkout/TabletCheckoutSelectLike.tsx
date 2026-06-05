interface TabletCheckoutSelectLikeProps {
  label: string;
  value: string;
}

export function TabletCheckoutSelectLike({
  label,
  value,
}: TabletCheckoutSelectLikeProps) {
  return (
    <div className="rounded-[12px] border border-white/10 bg-black/22 px-4 py-3">
      <span className="block text-[12px] uppercase tracking-[0.12em] text-white/46">
        {label}
      </span>
      <span className="mt-2 block text-[16px] text-white">{value}</span>
    </div>
  );
}
