"use client";

import Link from "next/link";

const zones = [
  {
    id: "zone-1",
    name: "Zone 1",
    location: "Ground Floor",
    sensors: 2,
    temperature: "28°C",
    gas: "420 ppm",
    status: "SAFE",
  },
  {
    id: "zone-2",
    name: "Zone 2",
    location: "First Floor",
    sensors: 2,
    temperature: "29°C",
    gas: "510 ppm",
    status: "SAFE",
  },
  {
    id: "zone-3",
    name: "Zone 3",
    location: "Second Floor",
    sensors: 2,
    temperature: "27°C",
    gas: "390 ppm",
    status: "SAFE",
  },
];

export default function ZonesPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-8 py-8 text-white">

      {/* HEADER */}
      <div className="mb-8">
        <Link
          href="/buildings"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to Buildings
        </Link>

        <p className="mt-6 text-sm tracking-[0.2em] text-red-400">
          MAIN ACADEMIC BLOCK
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Zone Monitoring
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Monitor individual zones and connected fire safety sensors
        </p>
      </div>

      {/* SYSTEM STATUS */}
      <div className="mb-8 flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">

        <div>
          <p className="text-sm font-medium text-emerald-400">
            Building Status: SAFE
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            All zones are currently operating normally
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-xs text-emerald-400">
            LIVE
          </span>
        </div>

      </div>

      {/* ZONES */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {zones.map((zone) => (
          <div
            key={zone.id}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-600">
                  Monitoring Zone
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {zone.name}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {zone.location}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400">
                  {zone.status}
                </span>
              </div>

            </div>

            {/* SENSOR DATA */}
            <div className="mt-6 grid grid-cols-3 gap-2">

              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="text-xs text-zinc-600">
                  Sensors
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {zone.sensors}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="text-xs text-zinc-600">
                  Temp
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {zone.temperature}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-3">
                <p className="text-xs text-zinc-600">
                  Gas
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {zone.gas}
                </p>
              </div>

            </div>

            {/* BUTTON */}
            <Link
              href={`/buildings/id/zones/${zone.id}`}
              className="mt-5 block w-full rounded-xl border border-white/10 py-3 text-center text-sm text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
            >
              Monitor Zone →
            </Link>

          </div>
        ))}

      </div>

    </main>
  );
}