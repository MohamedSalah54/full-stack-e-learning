export default function CategoriesFilter() {
  const categories = [
    { name: "Design", count: 10 },
    { name: "Development", count: 24 },
    { name: "Marketing", count: 7 },
    { name: "Business", count: 15 },
    { name: "AI", count: 4 },
  ];

  return (
    <div className="w-[270px] flex flex-col gap-5">
      <h3 className="text-[#333] font-roboto font-semibold text-[20px]">
        Categories
      </h3>

      <div className="flex flex-col gap-3">
        {categories.map((cat) => (
          <label
            key={cat.name}
            className="flex items-center justify-between text-gray-800"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              {cat.name}
            </div>

            <span className="text-gray-600 text-sm">{cat.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
