export default function TagsFilter() {
  const tags = [
    { name: "UI", count: 5 },
    { name: "React", count: 12 },
    { name: "Next.js", count: 7 },
    { name: "Node", count: 9 },
    { name: "Tailwind", count: 4 },
  ];

  return (
    <div className="w-[270px] flex flex-col gap-5">
      <h3 className="text-[#333] font-roboto font-semibold text-[20px]">
        Tags
      </h3>

      <div className="flex flex-col gap-3">
        {tags.map((tag) => (
          <label
            key={tag.name}
            className="flex items-center justify-between text-gray-800"
          >
            {/* checkbox + label */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              {tag.name}
            </div>

            {/* number */}
            <span className="text-gray-600 text-sm">{tag.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
