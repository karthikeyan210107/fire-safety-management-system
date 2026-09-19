import Link from "next/link";

export default function Zone3Page() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">

      <Link
        href="/buildings/id"
        className="text-sm text-slate-400 hover:text-white"
      >
        ← Back to Building
      </Link>

      <div className="mt-6">
        <p className="text-sm text-slate-400">
          LIVE MONITORING
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Zone 3
        </h1>

        <p className="mt-2 text-slate-400">
          Real-time fire safety sensor monitoring
        </p>
      </div>

      {/* Zone Status */}

      <div className="mt-8 rounded-2xl border border-yellow-900 bg-slate-900 p-6">
        <p className="text-sm text-slate-400">
          ZONE STATUS
        </p>

        <h2 className="mt-2 text-2xl font-bold text-yellow-400">
          ● ATTENTION
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          One or more sensors require attention.
        </p>
      </div>

      {/* Sensors */}

      <h2 className="mt-10 text-2xl font-bold">
        Live Sensors
      </h2>

      <div className="mt-5 grid gap-5 md:grid-cols-3">

        {/* Temperature */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            TEMPERATURE
          </p>

          <p className="mt-4 text-4xl font-bold">
            42°C
          </p>

          <p className="mt-3 text-green-400">
            ● Normal
          </p>

          <p className="mt-4 text-xs text-slate-500">
            DHT11 Sensor
          </p>
        </div>

        {/* Smoke / Gas */}

        <div className="rounded-2xl border border-yellow-900 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            SMOKE / GAS
          </p>

          <p className="mt-4 text-4xl font-bold">
            1250
          </p>

          <p className="mt-3 text-yellow-400">
            ● High Alert
          </p>

          <p className="mt-4 text-xs text-slate-500">
            Gas Sensor
          </p>
        </div>

        {/* Flame */}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            FLAME
          </p>

          <p className="mt-4 text-4xl font-bold">
            CLEAR
          </p>

          <p className="mt-3 text-green-400">
            ● No Flame
          </p>

          <p className="mt-4 text-xs text-slate-500">
            Flame Sensor
          </p>
        </div>

      </div>

      {/* Sensor Health */}

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-xl font-bold">
          Sensor Health
        </h2>

        <div className="mt-5 space-y-4">

          <div className="flex justify-between">
            <span className="text-slate-400">
              Temperature Sensor
            </span>

            <span className="text-green-400">
              ● Online
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Smoke / Gas Sensor
            </span>

            <span className="text-yellow-400">
              ● Attention
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-400">
              Flame Sensor
            </span>

            <span className="text-green-400">
              ● Online
            </span>
          </div>

        </div>

      </div>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-500">
        Last updated: Just now • Firebase integration will be connected later.
      </div>

    </main>
  );
}