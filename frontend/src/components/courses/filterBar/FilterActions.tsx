export default function FilterActions() {
  return (
    <div className="w-[268px] h-[48px] flex justify-between items-center gap-3 mt-4">
      <button
        className="
          w-[128px] 
          h-[48px] 
          rounded-[6px] 
          px-5 
          py-3 
          text-white 
          bg-green-600 
          cursor-pointer
        "
      >
        Filter
      </button>

      <button
        className="
          w-[128px] 
          h-[48px] 
          rounded-[6px] 
          px-5 
          py-3 
          bg-gray-200 
          text-gray-700
          cursor-pointer
        "
      >
        Reset
      </button>
    </div>
  );
}
