export default function PriceFilter() {
  return (
    <div className="w-[268px] flex flex-col gap-5">
      <h3 className="text-[#333] font-roboto font-semibold text-[20px] leading-[125%]">
        Price
      </h3>

      <div className="flex flex-col gap-3">

        {/* Free */}
        <label className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" />
            Free
          </div>
          <span className="text-gray-600 text-sm">12</span>
        </label>

        {/* Paid */}
        <label className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4" />
            Paid
          </div>
          <span className="text-gray-600 text-sm">34</span>
        </label>

      </div>
    </div>
  );
}
