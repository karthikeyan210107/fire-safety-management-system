"use client";

import CommandCenter3D from "./components/CommandCenter3D";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070707] px-6 py-8 text-white">
      {/* HEADER */}
      <header className="mx-auto mb-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs tracking-[0.3em] text-cyan-400">
              FIRE SAFETY SYSTEM
            </div>

            <h1 className="mt-2 text-3xl font-bold">
              Command Center
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Monitor buildings, sensors and emergency conditions
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-xs text-emerald-300">
              System Online
            </span>
          </div>
        </div>
      </header>

      {/* 3D FIRE COMMAND CENTER */}
      <section className="mx-auto max-w-7xl">
        <CommandCenter3D />
      </section>

      {/* SYSTEM OVERVIEW */}
      <section className="mx-auto mt-8 max-w-7xl">
        <h2 className="mb-4 text-lg font-semibold">
          System Overview
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <OverviewCard
            title="BUILDINGS"
            value="3"
            status="All operational"
            statusColor="text-emerald-400"
          />

          <OverviewCard
            title="SENSORS ONLINE"
            value="12"
            status="Network healthy"
            statusColor="text-emerald-400"
          />

          <OverviewCard
            title="ACTIVE ALERTS"
            value="0"
            status="No emergencies"
            statusColor="text-emerald-400"
          />

          <OverviewCard
            title="MAINTENANCE"
            value="2"
            status="Requires attention"
            statusColor="text-yellow-400"
            warning
          />
        </div>
      </section>

      {/* LIVE MONITORING */}
      <section className="mx-auto mt-8 max-w-7xl">
        <h2 className="mb-4 text-lg font-semibold">
          Live Monitoring
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SensorCard
            title="Temperature"
            status="NORMAL"
            value="28°C"
          />

          <SensorCard
            title="Gas Level"
            status="NORMAL"
            value="420 ppm"
          />

          <SensorCard
            title="Flame Sensor"
            status="SAFE"
            value="CLEAR"
          />
        </div>
      </section>

      {/* BUILDING STATUS */}
      <section className="mx-auto mt-8 max-w-7xl">
        <h2 className="mb-4 text-lg font-semibold">
          Building Status
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <BuildingCard
            name="Main Academic Block"
            zones={4}
            sensors={6}
          />

          <BuildingCard
            name="Engineering Block"
            zones={3}
            sensors={4}
          />

          <BuildingCard
            name="Administration Block"
            zones={2}
            sensors={2}
          />
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section className="mx-auto mt-8 max-w-7xl pb-10">
        <h2 className="mb-4 text-lg font-semibold">
          Recent Activity
        </h2>

        <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]">
          <Activity text="System health check completed" />
          <Activity text="Sensor network checked" />
          <Activity text="Building inspection completed" />
          <Activity text="Maintenance reminder generated" />
        </div>
      </section>
    </main>
  );
}

function OverviewCard({
  title,
  value,
  status,
  statusColor,
  warning = false,
}: {
  title: string;
  value: string;
  status: string;
  statusColor: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-[#0d0d0d] p-5 ${
        warning
          ? "border-yellow-400/10"
          : "border-white/10"
      }`}
    >
      <p className="text-xs text-zinc-500">
        {title}
      </p>

      <p className="mt-2 text-3xl font-semibold">
        {value}
      </p>

      <p className={`mt-1 text-xs ${statusColor}`}>
        {status}
      </p>
    </div>
  );
}

function SensorCard({
  title,
  status,
  value,
}: {
  title: string;
  status: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5">
      <div className="flex justify-between">
        <span className="text-sm text-zinc-400">
          {title}
        </span>

        <span className="text-xs text-emerald-400">
          {status}
        </span>
      </div>

      <p className="mt-3 text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}

function BuildingCard({
  name,
  zones,
  sensors,
}: {
  name: string;
  zones: number;
  sensors: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {name}
        </h3>

        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-400">
          SAFE
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-zinc-500">
            ZONES
          </p>

          <p className="mt-1 text-xl font-semibold">
            {zones}
          </p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">
            SENSORS
          </p>

          <p className="mt-1 text-xl font-semibold">
            {sensors}
          </p>
        </div>
      </div>
    </div>
  );
}

function Activity({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4 last:border-b-0">
      <span className="h-2 w-2 rounded-full bg-cyan-400" />

      <span className="text-sm text-zinc-400">
        {text}
      </span>
    </div>
  );
}