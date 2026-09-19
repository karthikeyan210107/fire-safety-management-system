"use client";

import Link from "next/link";

const buildings = [
  {
    id: "id",
    name: "Main Academic Block",
    location: "Academic Campus",
    zones: 4,
    sensors: 6,
    status: "SAFE",
  },
  {
    id: "id",
    name: "Engineering Block",
    location: "Engineering Campus",
    zones: 3,
    sensors: 4,
    status: "SAFE",
  },
  {
    id: "id",
    name: "Administration Block",
    location: "Administrative Campus",
    zones: 2,
    sensors: 2,
    status: "SAFE",
  },
];

export default function BuildingsPage() {
  return (
    <main className="min-h-screen bg-[#070707] px-8 py-8 text-white">

      <div className="mb-8">
        <p className="text-sm tracking-[0.2em] text-red-400">
          FIRE SAFETY SYSTEM
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Buildings
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Monitor buildings, zones and connected safety sensors
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {buildings.map((building, index) => (
          <div
            key={index}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-600">
                  Building {index + 1}
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  {building.name}
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {building.location}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-emerald-400">
                  {building.status}
                </span>
              </div>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-zinc-500">
                  Zones
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {building.zones}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="text-xs text-zinc-500">
                  Sensors
                </p>

                <p className="mt-1 text-xl font-semibold">
                  {building.sensors}
                </p>
              </div>

            </div>

            <Link
              href={`/buildings/${building.id}/zones`}
              className="mt-5 block w-full rounded-xl border border-white/10 py-3 text-center text-sm text-zinc-400 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
            >
              View Zones →
            </Link>

          </div>
        ))}

      </div>

    </main>
  );
}