export default function PerfSearchBar({ filter, setFilter }) {
  return (
    <div className="w-full max-w-2xl">
      <input
        type="text"
        placeholder="Search students by name or ID..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 rounded-lg border focus:outline-none transition-all"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--border-color)",
          color: "var(--text-color)",
          /* placeholder text color */
          /* Safari / Chrome */
          WebkitTextFillColor: "var(--text-color)",
        }}
      />
      <style jsx>{`
        input::placeholder {
          color: var(--muted-text);
        }
      `}</style>
    </div>
  );
}
