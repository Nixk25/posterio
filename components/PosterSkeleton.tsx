const PosterSkeleton = () => {
  return (
    <div className="flex flex-col first:border-l h-[600px] sm:h-[700px] xl:h-[750px] w-full animate-pulse">
      <div className="flex justify-between items-center p-2 bg-white border-t border-r border-black/10">
        <div className="flex flex-col gap-2 w-full">
          <div className="h-5 w-32 bg-gray-200 rounded" />
          <div className="flex gap-1">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="h-6 w-6 bg-gray-200 rounded" />
      </div>
      <div className="w-full h-full bg-white" />
    </div>
  );
};

export default PosterSkeleton;
