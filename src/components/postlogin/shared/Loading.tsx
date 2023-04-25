export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex">
      <svg className=" animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
      Loading...
    </div>
  );
}
