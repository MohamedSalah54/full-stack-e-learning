export default function LevelsFilter() {
  const levels = [
    { name: "Beginner", count: 12 },
    { name: "Intermediate", count: 8 },
    { name: "Advanced", count: 5 },
  ];

  return (
    <div className="w-[270px] flex flex-col gap-5">
      <h3 className="text-[#333] font-roboto font-semibold text-[20px]">
        Levels
      </h3>

      <div className="flex flex-col gap-3">
        {levels.map((lvl) => (
          <label
            key={lvl.name}
            className="flex items-center justify-between text-gray-800"
          >
            {/* checkbox + label */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              {lvl.name}
            </div>

            {/* optional count */}
            <span className="text-gray-600 text-sm">{lvl.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
