import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar() {
  const [filter, setFilter] = useState("");

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="relative w-full max-w-lg mx-auto">
        {/* Search icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)] pointer-events-none" />

        {/* Clear button */}
        {filter && (
          <button
            type="button"
            onClick={() => setFilter("")}
            aria-label="Clear"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-muted-hover)] transition"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Input */}
        <input
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setFilter("")}
          className="
            w-full
            py-2.5 pl-10 pr-10
            rounded-xl
            bg-[var(--bg)]
            text-[var(--text-color)]
            placeholder-[var(--text-muted)]
            border border-[var(--border-color)]
            shadow-sm
            focus:outline-none focus:ring-2 focus:ring-[var(--ring-color)]
            transition
            text-sm sm:text-base
          "
        />
      </div>
    </div>
  );
}
