type DashboardCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  icon: string;
  status?: "safe" | "warning" | "danger" | "info";
};

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  status = "info",
}: DashboardCardProps) {
  const statusStyles = {
    safe: "border-emerald-500/20 bg-emerald-500/5",
    warning: "border-yellow-500/20 bg-yellow-500/5",
    danger: "border-red-500/20 bg-red-500/5",
    info: "border-blue-500/20 bg-blue-500/5",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl ${statusStyles[status]}`}
    >
      {/* Glow */}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/5 blur-2xl transition-all duration-300 group-hover:bg-white/10" />

      {/* Top */}
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
            {value}
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-2xl">
          {icon}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative mt-5 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            status === "safe"
              ? "bg-emerald-400"
              : status === "warning"
              ? "bg-yellow-400"
              : status === "danger"
              ? "bg-red-400"
              : "bg-blue-400"
          }`}
        />

        <p className="text-xs text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
}