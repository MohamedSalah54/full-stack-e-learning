"use client";
import { FiGrid, FiList } from "react-icons/fi";

type ViewType = "grid" | "list";

interface SearchBarWithViewProps {
  view: ViewType;
  setView: React.Dispatch<React.SetStateAction<ViewType>>;
}

export default function SearchBarWithView({
  view,
  setView,
}: SearchBarWithViewProps) {
  return (
    <div
      className="w-[960px] h-[48px] flex justify-between items-center "
      style={{ marginLeft: "70px" }}
    >
      <input
        type="text"
        placeholder="Search..."
        className="w-[300px] h-[48px] px-5 py-3 gap-2 rounded-[6px] border border-[#E2E0DB] bg-gray-100 focus:outline-none"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={() => setView("list")}
          className={`p-2 rounded hover:bg-gray-200 ${
            view === "list" ? "bg-gray-300" : ""
          }`}
        >
          <FiList size={20} />
        </button>

        <button
          onClick={() => setView("grid")}
          className={`p-2 rounded hover:bg-gray-200 ${
            view === "grid" ? "bg-gray-300" : ""
          }`}
        >
          <FiGrid size={20} />
        </button>
      </div>
    </div>
  );
}
