export default function Loading() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Loading speakers">
      <div className="h-8 w-2/3 rounded-lg bg-foreground/10" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-xl bg-foreground/5" />
        <div className="h-32 rounded-xl bg-foreground/5" />
        <div className="h-32 rounded-xl bg-foreground/5" />
      </div>
    </div>
  );
}