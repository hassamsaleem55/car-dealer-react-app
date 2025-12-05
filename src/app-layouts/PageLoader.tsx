import DotLoader from "@components-dir/loader";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <DotLoader size="lg" />
    </div>
  );
}
