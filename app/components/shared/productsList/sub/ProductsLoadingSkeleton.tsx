const ProductsLoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div className="animate-pulse rounded-lg border p-4 shadow-md" key={i}>
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-300"></div>
          <div className="mb-2 h-4 w-full rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoadingSkeleton;
