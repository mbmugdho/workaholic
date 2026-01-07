export default function Loading({ label = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10">
      <span className="loading loading-spinner loading-md" />
      <span className="text-sm text-base-content/70">{label}</span>
    </div>
  );
}