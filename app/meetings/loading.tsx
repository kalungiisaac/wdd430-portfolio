export default function Loading() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Loading meetings">
      <div className="h-8 w-2/3 rounded-lg bg-foreground/10" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-40 rounded-xl bg-foreground/5" />
        <div className="h-40 rounded-xl bg-foreground/5" />
        <div className="h-40 rounded-xl bg-foreground/5" />
      </div>
    </div>
  );
}