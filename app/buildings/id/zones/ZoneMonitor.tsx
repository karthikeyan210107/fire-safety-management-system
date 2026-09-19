"use client";

import { motion } from "motion/react";

interface ZoneMonitorProps {
  zoneName: string;
  floor: string;
}

export default function ZoneMonitor({
  zoneName,
  floor,
}: ZoneMonitorProps) {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-gray-400">
            FIRE SAFETY SYSTEM
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {zoneName}
          </h1>

          <p className="text-gray-400 mt-1">
            {floor} · Real-time Zone Monitoring
          </p>
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />

            <div>
              <h2 className="text-2xl font-semibold">
                SAFE
              </h2>

              <p className="text-gray-400">
                No emergency condition detected
              </p>
            </div>
          </div>
        </motion.div>

        {/* Sensors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <SensorCard
            title="Flame Sensor"
            value="NORMAL"
          />

          <SensorCard
            title="Gas / Smoke"
            value="NORMAL"
          />

          <SensorCard
            title="Temperature"
            value="NORMAL"
          />

        </div>

        {/* System information */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Zone Information
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            <Info label="Zone" value={zoneName} />

            <Info label="Floor" value={floor} />

            <Info label="Sensors" value="3 Connected" />

            <Info label="System" value="Online" />

          </div>
        </div>

      </div>
    </main>
  );
}

function SensorCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <p className="text-green-400 text-xl font-semibold mt-3">
        {value}
      </p>
    </motion.div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <p className="text-white mt-1">
        {value}
      </p>
    </div>
  );
}