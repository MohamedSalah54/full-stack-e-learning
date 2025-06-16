const HeroCategories = () => {
  const categories = [
    {
      title: "Electronics",
      image: "/images/electronics.jpg",
      rating: 4.5,
      reviews: 1234,
    },
    {
      title: "Fashion",
      image: "/images/fashion.jpg",
      rating: 4.0,
      reviews: 980,
    },
    {
      title: "Home & Garden",
      image: "/images/home.jpg",
      rating: 5.0,
      reviews: 2100,
    },
  ];

  return (
    <section className="w-full py-16 px-4 bg-white">
      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
            <img src={cat.image} alt={cat.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                {"⭐".repeat(Math.round(cat.rating))} 
                <span className="text-xs text-gray-500 ml-2">({cat.reviews} reviews)</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Search button */}
      <div className="flex justify-center mt-10">
        <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition">
          Search All Categories
        </button>
      </div>

      {/* Heading + Span */}
      <div className="text-center mt-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find What You're Looking For</h1>
        <span className="text-gray-600 text-base">Explore thousands of categories and products.</span>
      </div>
    </section>
  );
};

export default HeroCategories;
