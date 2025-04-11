export default function SelectionCard({ id, selected, icon, label, onClick }) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`border-2 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-amber-400 ${
        selected ? "border-amber-500 bg-amber-900/30" : "border-white/30"
      }`}
    >
      <div className="text-3xl mb-3 text-white">{icon}</div>
      <div className="text-white text-sm text-center">{label}</div>
    </div>
  );
}
