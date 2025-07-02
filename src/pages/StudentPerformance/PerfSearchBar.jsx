export default function PerfSearchBar({ filter, setFilter, theme = "light" }) {
  // 🌓 Theme-based styling
  const bgColor = theme === "dark" ? "bg-[#1e1e1e]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-black";
  const borderColor = theme === "dark" ? "border-gray-700" : "border-gray-300";
  const placeholderColor = theme === "dark" ? "placeholder-gray-400" : "placeholder-gray-500";

  return (
    <div className="w-full max-w-2xl mb-4">
      <input
        type="text"
        placeholder="Search students by name or ID..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={`w-full p-3 rounded-lg border ${borderColor} ${bgColor} ${textColor} ${placeholderColor} focus:outline-none transition-all`}
      />
    </div>
  );
}
