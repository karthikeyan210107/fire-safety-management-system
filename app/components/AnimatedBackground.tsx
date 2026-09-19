"use client";

import Link from "next/link";
import { motion } from "motion/react";

const stats = [
  {
    label: "Buildings",
    value: "3",
    detail: "All monitored",
  },
  {
    label: "Sensors",
    value: "31",
    detail: "31 connected",
  },
  {
    label: "Healthy",
    value: "29",
    detail: "93.5% healthy",
  },
  {
    label: "Active Alerts",
    value: "2",
    detail: "Needs attention",
  },
];

const navigation = [
  { name: "Dashboard", href: "/", icon: "⌂" },
  { name: "Buildings", href: "/buildings", icon: "▦" },
  { name: "Inspections", href: "/inspections", icon: "✓" },
  { name: "Maintenance", href: "/maintenance", icon: "⚙" },
  { name: "Alerts", href: "/alerts", icon: "!" },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070b] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-red-600/5 blur-3xl"
        />
      </div>


      {/* Layout */}
      <div className="relative flex min-h-screen">


        {/* SIDEBAR */}
        <aside className="hidden w-64 shrink-0 border-r border-white/5 bg-black/20 p-5 backdrop-blur-xl lg:block">

          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-xl ring-1 ring-orange-500/20">
              🔥
            </div>

            <div>
              <h1 className="font-bold tracking-wide">
                FIREGUARD
              </h1>

              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Safety Command
              </p>
            </div>

          </div>


          {/* Navigation */}
          <nav className="space-y-2">

            {navigation.map((item, index) => (

              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.08,
                }}
              >

                <Link
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                    item.name === "Dashboard"
                      ? "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/10"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >

                  <span className="w-5 text-center text-lg">
                    {item.icon}
                  </span>

                  {item.name}

                  {item.name === "Alerts" && (
                    <span className="ml-auto rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] text-red-400">
                      2
                    </span>
                  )}

                </Link>

              </motion.div>

            ))}

          </nav>


          {/* System status */}
          <div className="absolute bottom-6 left-5 right-5 rounded-2xl border border-white/5 bg-white/[0.02] p-4">

            <div className="flex items-center gap-2">

              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>

              <span className="text-xs font-medium text-green-400">
                System Operational
              </span>

            </div>

            <p className="mt-2 text-[11px] text-slate-600">
              Continuous monitoring active
            </p>

          </div>

        </aside>


        {/* MAIN CONTENT */}
        <section className="flex-1 p-5 md:p-8 lg:p-10">


          {/* Top bar */}
          <motion.header
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >

            <div>

              <p className="text-xs uppercase tracking-[0.25em] text-orange-500">
                Fire Safety Management
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Command Center
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Real-time overview of your fire safety infrastructure.
              </p>

            </div>


            <div className="hidden items-center gap-3 rounded-full border border-white/5 bg-white/[0.03] px-4 py-2 md:flex">

              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.7)]" />

              <span className="text-xs text-slate-400">
                ALL SYSTEMS NORMAL
              </span>

            </div>

          </motion.header>


          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat, index) => (

              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + index * 0.08,
                }}
                whileHover={{
                  y: -4,
                }}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition hover:border-orange-500/20"
              >

                <p className="text-xs uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>

                <div className="mt-3 flex items-end justify-between">

                  <p className="text-3xl font-bold">
                    {stat.value}
                  </p>

                  <span className="text-xs text-slate-600">
                    {stat.detail}
                  </span>

                </div>

              </motion.div>

            ))}

          </div>


          {/* Main grid */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">


            {/* Live monitoring */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="xl:col-span-2 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-orange-500">
                    Live Monitoring
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    Easwari Engineering College
                  </h3>

                </div>

                <Link
                  href="/buildings/id/zones/zone-1"
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-400 transition hover:border-orange-500/30 hover:text-orange-400"
                >
                  View Zone →
                </Link>

              </div>


              {/* Status */}
              <div className="mt-6 rounded-2xl border border-green-500/10 bg-green-500/[0.03] p-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <span className="relative flex h-3 w-3">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-green-400 opacity-40" />
                      <span className="relative h-3 w-3 rounded-full bg-green-400" />
                    </span>

                    <div>
                      <p className="font-semibold text-green-400">
                        SAFE
                      </p>

                      <p className="text-xs text-slate-600">
                        Zone 1 • Live
                      </p>
                    </div>

                  </div>

                  <span className="text-xs text-slate-600">
                    Monitoring active
                  </span>

                </div>

              </div>


              {/* Sensors */}
              <div className="mt-5 grid gap-4 md:grid-cols-3">

                <Sensor
                  title="Temperature"
                  value="27°C"
                  status="Normal"
                  icon="🌡"
                />

                <Sensor
                  title="Smoke / Gas"
                  value="600"
                  status="Normal"
                  icon="◉"
                />

                <Sensor
                  title="Flame"
                  value="SAFE"
                  status="No flame detected"
                  icon="🔥"
                />

              </div>

            </motion.div>


            {/* Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 backdrop-blur-xl"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-red-400">
                    Attention
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    Active Alerts
                  </h3>

                </div>

                <Link
                  href="/alerts"
                  className="text-xs text-slate-500 hover:text-white"
                >
                  View all →
                </Link>

              </div>


              <div className="mt-6 space-y-3">

                <Alert
                  title="High Gas Level"
                  location="EEC • Zone 3"
                  value="1250"
                />

                <Alert
                  title="Sensor Maintenance"
                  location="Block B • Zone 3"
                  value="OPEN"
                />

              </div>

            </motion.div>

          </div>


          {/* Bottom section */}
          <div className="mt-6 grid gap-6 md:grid-cols-2">


            {/* Health */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Infrastructure
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    Sensor Health
                  </h3>
                </div>

                <Link
                  href="/maintenance"
                  className="text-xs text-slate-500 hover:text-orange-400"
                >
                  Maintenance →
                </Link>

              </div>


              <div className="mt-6">

                <div className="flex items-end justify-between">

                  <div>
                    <span className="text-4xl font-bold">
                      93.5%
                    </span>

                    <p className="mt-1 text-xs text-slate-600">
                      29 of 31 sensors healthy
                    </p>
                  </div>

                  <span className="text-sm text-green-400">
                    Excellent
                  </span>

                </div>


                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "93.5%" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.8,
                    }}
                    className="h-full rounded-full bg-green-500"
                  />

                </div>

              </div>

            </motion.div>


            {/* Recent activity */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6"
            >

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Activity
              </p>

              <h3 className="mt-1 text-xl font-semibold">
                Recent Events
              </h3>


              <div className="mt-5 space-y-4">

                <Activity
                  title="Inspection completed"
                  detail="EEC • Zone 1"
                  time="Today, 7:42 PM"
                />

                <Activity
                  title="Sensor health verified"
                  detail="EEC • Zone 2"
                  time="Today, 6:18 PM"
                />

                <Activity
                  title="Gas warning recorded"
                  detail="EEC • Zone 3"
                  time="Today, 5:52 PM"
                />

              </div>

            </motion.div>

          </div>

        </section>

      </div>

    </main>
  );
}


/* SENSOR COMPONENT */

function Sensor({
  title,
  value,
  status,
  icon,
}: {
  title: string;
  value: string;
  status: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl border border-white/[0.06] bg-black/20 p-5"
    >

      <div className="flex items-center justify-between">

        <span className="text-lg">
          {icon}
        </span>

        <span className="text-[10px] uppercase tracking-wider text-green-400">
          ● Online
        </span>

      </div>

      <p className="mt-5 text-xs uppercase tracking-wider text-slate-600">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {status}
      </p>

    </motion.div>
  );
}


/* ALERT COMPONENT */

function Alert({
  title,
  location,
  value,
}: {
  title: string;
  location: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] p-4"
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-medium">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-600">
            {location}
          </p>

        </div>

        <span className="rounded-lg bg-red-500/10 px-2 py-1 text-[10px] text-red-400">
          {value}
        </span>

      </div>

    </motion.div>
  );
}


/* ACTIVITY COMPONENT */

function Activity({
  title,
  detail,
  time,
}: {
  title: string;
  detail: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">

      <div>

        <p className="text-sm">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-600">
          {detail}
        </p>

      </div>

      <span className="text-[10px] text-slate-700">
        {time}
      </span>

    </div>
  );
}