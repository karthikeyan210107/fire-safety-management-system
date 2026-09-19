import Link from "next/link";

const inspections = [
  {
    id: "INS-001",
    building: "Easwari Engineering College",
    zone: "Zone 1",
    date: "13 Sep 2026",
    inspector: "Safety Team",
    status: "Passed",
  },
  {
    id: "INS-002",
    building: "Easwari Engineering College",
    zone: "Zone 2",
    date: "12 Sep 2026",
    inspector: "Safety Team",
    status: "Passed",
  },
  {
    id: "INS-003",
    building: "Easwari Engineering College",
    zone: "Zone 3",
    date: "11 Sep 2026",
    inspector: "Safety Team",
    status: "Attention",
  },
];

export default function InspectionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            FIRE SAFETY MANAGEMENT
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Inspections
          </h1>

          <p className="mt-2 text-slate-400">
            Record and track fire safety inspections.
          </p>
        </div>

        <button className="rounded-xl bg-orange-600 px-5 py-3 font-semibold hover:bg-orange-500">
          + New Inspection
        </button>

      </div>

      {/* Summary */}

      <div className="mt-8 grid grid-cols-3 gap-5">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Total Inspections
          </p>

          <p className="mt-2 text-3xl font-bold">
            3
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Passed
          </p>

          <p className="mt-2 text-3xl font-bold text-green-400">
            2
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Need Attention
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-400">
            1
          </p>
        </div>

      </div>

      {/* Inspection Records */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold">
          Inspection Records
        </h2>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

          <div className="grid grid-cols-6 border-b border-slate-800 px-6 py-4 text-sm font-semibold text-slate-400">

            <span>ID</span>
            <span>Building</span>
            <span>Zone</span>
            <span>Date</span>
            <span>Inspector</span>
            <span>Status</span>

          </div>

          {inspections.map((inspection) => (

            <div
              key={inspection.id}
              className="grid grid-cols-6 items-center border-b border-slate-800 px-6 py-5 last:border-b-0"
            >

              <span className="font-medium">
                {inspection.id}
              </span>

              <span className="text-slate-300">
                {inspection.building}
              </span>

              <span className="text-slate-400">
                {inspection.zone}
              </span>

              <span className="text-slate-400">
                {inspection.date}
              </span>

              <span className="text-slate-400">
                {inspection.inspector}
              </span>

              <span
                className={
                  inspection.status === "Passed"
                    ? "text-green-400"
                    : "text-yellow-400"
                }
              >
                ● {inspection.status}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Inspection Workflow */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="text-3xl">
            📋
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            Inspection Records
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Maintain digital records of every fire safety inspection.
          </p>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="text-3xl">
            📱
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            QR Inspection
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Scan a building or zone QR code to quickly start an inspection.
          </p>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="text-3xl">
            ✅
          </div>

          <h3 className="mt-4 text-lg font-semibold">
            Compliance
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Track safety compliance and identify areas that need attention.
          </p>

        </div>

      </div>

      {/* Back */}

      <div className="mt-8">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-white"
        >
          ← Back to Dashboard
        </Link>
      </div>

    </main>
  );
}