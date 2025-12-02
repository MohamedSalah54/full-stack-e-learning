import { FaHeartBroken } from "react-icons/fa";

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
      <FaHeartBroken size={80} className="text-red-400" />
      <h2 className="text-2xl font-semibold text-gray-700">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500">
        Browse our courses and add your favorites here.
      </p>
    </div>
  );
};

export default EmptyWishlist;
