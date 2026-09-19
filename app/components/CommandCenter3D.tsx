"use client";

import { motion } from "motion/react";
import {
  Flame,
  ShieldCheck,
  Activity,
  Thermometer,
  Wind,
  Radio,
  AlertTriangle,
  Building2,
  Wifi,
} from "lucide-react";

export default function CommandCenter3D() {
  return (
    <div className="relative min-h-[700px] overflow-hidden rounded-3xl border border-white/10 bg-[#05070b] text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-4 border-b border-white/10 p-6 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-red-400">
            <Radio size={14} />
            FIRE COMMAND CENTER
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Emergency Monitoring
          </h1>

          <p className="mt-1 text-sm text-white/45">
            Real-time building safety intelligence
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>

          <span className="text-sm font-medium text-emerald-300">
            SYSTEM ONLINE
          </span>
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10 grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr]">

        {/* Building visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]"
        >

          <div className="absolute left-6 top-6">
            <div className="flex items-center gap-2">
              <Building2 size={18} className="text-orange-400" />

              <div>
                <p className="text-sm font-semibold">
                  Easwari Engineering College
                </p>

                <p className="text-xs text-white/35">
                  Main Building · 3 monitored zones
                </p>
              </div>
            </div>
          </div>

          {/* Building */}
          <div className="absolute left-1/2 top-1/2 w-[270px] -translate-x-1/2 -translate-y-1/2">

            {/* top glow */}
            <div className="absolute -inset-10 rounded-full bg-orange-500/10 blur-3xl" />

            <motion.div
              animate={{
                rotateX: [0, 3, 0],
                rotateY: [-3, 3, -3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
              className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.12] to-white/[0.035] p-5 shadow-2xl"
            >

              {/* Building title */}
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  Safety Grid
                </span>

                <ShieldCheck className="text-emerald-400" size={20} />
              </div>

              {/* Zones */}
              <div className="space-y-3">

                <Zone
                  name="ZONE 01"
                  floor="Ground Floor"
                  status="SAFE"
                />

                <Zone
                  name="ZONE 02"
                  floor="First Floor"
                  status="SAFE"
                />

                <Zone
                  name="ZONE 03"
                  floor="Second Floor"
                  status="SAFE"
                />

              </div>
            </motion.div>
          </div>

          {/* Bottom status */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">

            <div className="flex items-center gap-2">
              <Wifi size={15} className="text-emerald-400" />

              <span className="text-xs text-white/60">
                Firebase Realtime Database
              </span>
            </div>

            <span className="text-xs font-medium text-emerald-400">
              CONNECTED
            </span>
          </div>
        </motion.div>

        {/* Sensor panel */}
        <div className="space-y-4">

          <div className="mb-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/35">
              Live Sensors
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Environmental Status
            </h2>
          </div>

          <Sensor
            icon={<Flame size={20} />}
            title="Flame Detection"
            value="NORMAL"
            detail="No flame detected"
            type="safe"
          />

          <Sensor
            icon={<Wind size={20} />}
            title="Gas / Smoke"
            value="NORMAL"
            detail="Air quality within threshold"
            type="safe"
          />

          <Sensor
            icon={<Thermometer size={20} />}
            title="Temperature"
            value="NORMAL"
            detail="24°C · Stable"
            type="safe"
          />

          {/* Overall status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/[0.06] p-5"
          >
            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10">
                <ShieldCheck
                  size={25}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-400/70">
                  Overall Status
                </p>

                <p className="mt-1 text-xl font-bold text-emerald-300">
                  ALL SYSTEMS SAFE
                </p>
              </div>

            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">

              <MiniStat
                label="Sensors"
                value="3/3"
              />

              <MiniStat
                label="Zones"
                value="3/3"
              />

              <MiniStat
                label="Alerts"
                value="0"
              />

            </div>
          </motion.div>

          {/* Activity */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-5">

            <div className="mb-4 flex items-center gap-2">
              <Activity size={17} className="text-orange-400" />

              <span className="text-sm font-semibold">
                System Activity
              </span>
            </div>

            <div className="space-y-3 text-xs">

              <ActivityRow
                text="Sensor network connected"
                time="Just now"
              />

              <ActivityRow
                text="Zone monitoring active"
                time="1 min ago"
              />

              <ActivityRow
                text="System health check completed"
                time="2 min ago"
              />

            </div>
          </div>
        </div>
      </div>

      {/* Bottom warning strip */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 px-6 py-4">

        <div className="flex items-center gap-3 text-xs text-white/40">

          <AlertTriangle size={15} className="text-yellow-400" />

          <span>
            Automatic emergency detection is active. Critical sensor
            conditions will trigger the response workflow.
          </span>

        </div>
      </div>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Zone({
  name,
  floor,
  status,
}: {
  name: string;
  floor: string;
  status: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.025, x: 3 }}
      className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
    >
      <div>
        <p className="text-xs font-semibold">{name}</p>
        <p className="mt-1 text-[10px] text-white/35">{floor}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

        <span className="text-[10px] font-bold text-emerald-400">
          {status}
        </span>
      </div>
    </motion.div>
  );
}

function Sensor({
  icon,
  title,
  value,
  detail,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail: string;
  type: "safe" | "warning" | "danger";
}) {
  const styles = {
    safe: "border-emerald-400/15 bg-emerald-400/[0.04] text-emerald-400",
    warning: "border-yellow-400/20 bg-yellow-400/[0.05] text-yellow-400",
    danger: "border-red-400/20 bg-red-400/[0.05] text-red-400",
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`rounded-2xl border p-5 ${styles[type]}`}
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/20">
            {icon}
          </div>

          <div>
            <p className="text-sm font-medium text-white">
              {title}
            </p>

            <p className="mt-1 text-xs text-white/40">
              {detail}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs font-bold">
            {value}
          </p>

          <span className="mt-2 block h-2 w-2 rounded-full bg-current ml-auto" />
        </div>
      </div>
    </motion.div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
      <p className="text-lg font-bold">{value}</p>

      <p className="mt-1 text-[10px] text-white/35">
        {label}
      </p>
    </div>
  );
}

function ActivityRow({
  text,
  time,
}: {
  text: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">

      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

        <span className="text-white/60">
          {text}
        </span>
      </div>

      <span className="text-white/25">
        {time}
      </span>

    </div>
  );
}