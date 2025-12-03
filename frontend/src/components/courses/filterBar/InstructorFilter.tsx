export default function InstructorFilter() {
  const instructors = [
    { name: "Ahmed Ali", count: 5 },
    { name: "John Smith", count: 8 },
    { name: "Mohamed Salah", count: 3 },
    { name: "Sara Y", count: 6 },
  ];

  return (
    <div className="w-[270px]  rounded-xl flex flex-col gap-5">
      <h3 className="text-[#333] font-roboto font-semibold text-[20px]">
        Instructor
      </h3>

      <div className="flex flex-col gap-3">
        {instructors.map((i) => (
          <label
            key={i.name}
            className="flex items-center justify-between text-gray-800"
          >
            {/* checkbox + name */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              {i.name}
            </div>

            {/* count on the right */}
            <span className="text-gray-600 text-sm">{i.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
