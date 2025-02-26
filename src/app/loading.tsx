export default function Loading() {
  return (
    <div
      className={
        "fixed top-0 left-0 flex h-full bg-[#ffffffc9] w-full flex-row items-center justify-center space-x-4 z-10"
      }
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
}
