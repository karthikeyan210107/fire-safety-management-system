"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  onValue,
  ref,
  remove,
  set,
} from "firebase/database";
import { database } from "../firebase";

type Alert = {
  id: string;
  title: string;
  location: string;
  value: string;
  severity: "Critical" | "High" | "Medium";
  status: "Active" | "Resolved";
  timestamp: string;
  type: string;
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [firebaseLive, setFirebaseLive] = useState(false);

  // --------------------------------
  // LISTEN TO FIREBASE ALERTS
  // --------------------------------

  useEffect(() => {
    const alertsRef = ref(database, "alerts");

    const unsubscribe = onValue(
      alertsRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setAlerts([]);
          setFirebaseLive(true);
          return;
        }

        const alertList: Alert[] = Object.entries(
          data
        ).map(([id, value]) => {
          const alert = value as Omit<
            Alert,
            "id"
          >;

          return {
            id,
            ...alert,
          };
        });

        alertList.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() -
            new Date(a.timestamp).getTime()
        );

        setAlerts(alertList);
        setFirebaseLive(true);
      },
      (error) => {
        console.error(
          "Firebase alerts error:",
          error
        );

        setFirebaseLive(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // --------------------------------
  // RESOLVE ALERT
  // --------------------------------

  async function resolveAlert(
    alert: Alert
  ) {
    await set(
      ref(database, `alerts/${alert.id}`),
      {
        ...alert,
        status: "Resolved",
      }
    );
  }

  // --------------------------------
  // DELETE ALERT
  // --------------------------------

  async function deleteAlert(
    alertId: string
  ) {
    await remove(
      ref(database, `alerts/${alertId}`)
    );
  }

  const activeAlerts = alerts.filter(
    (alert) =>
      alert.status === "Active"
  );

  const criticalAlerts =
    activeAlerts.filter(
      (alert) =>
        alert.severity === "Critical"
    );

  const highAlerts =
    activeAlerts.filter(
      (alert) =>
        alert.severity === "High"
    );

  return (
    <main className="min-h-screen bg-[#05070b] p-8 text-white">

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-8 flex items-center justify-between"
      >

        <div>

          <p className="mb-2 text-sm tracking-[0.25em] text-cyan-400">
            FIRE SAFETY COMMAND CENTER
          </p>

          <h1 className="text-4xl font-bold">
            Alerts
          </h1>

          <p className="mt-2 text-gray-400">
            Real-time fire and sensor alerts
          </p>

        </div>

        <div
          className={`flex items-center gap-2 rounded-full border px-4 py-2 ${
            firebaseLive
              ? "border-green-400/20 bg-green-400/5 text-green-400"
              : "border-red-400/20 bg-red-400/5 text-red-400"
          }`}
        >

          <span
            className={`h-2 w-2 rounded-full ${
              firebaseLive
                ? "animate-pulse bg-green-400"
                : "bg-red-400"
            }`}
          />

          {firebaseLive
            ? "LIVE"
            : "OFFLINE"}

        </div>

      </motion.div>

      {/* SUMMARY */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        <SummaryCard
          title="ACTIVE ALERTS"
          value={activeAlerts.length}
          subtitle="Currently requiring attention"
        />

        <SummaryCard
          title="CRITICAL"
          value={criticalAlerts.length}
          subtitle="Immediate attention required"
          danger
        />

        <SummaryCard
          title="HIGH PRIORITY"
          value={highAlerts.length}
          subtitle="Requires investigation"
        />

      </div>

      {/* ALERT LIST */}

      <section>

        <div className="mb-5">

          <h2 className="text-xl font-semibold">
            Alert Center
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Alerts generated from the fire
            safety monitoring system
          </p>

        </div>

        {alerts.length === 0 ? (

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-2xl border border-green-400/10 bg-green-400/[0.03] p-10 text-center"
          >

            <div className="text-4xl">
              ✓
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              No Active Alerts
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              All monitored systems are
              currently operating normally.
            </p>

          </motion.div>

        ) : (

          <div className="space-y-4">

            {alerts.map(
              (alert, index) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  index={index}
                  onResolve={() =>
                    resolveAlert(alert)
                  }
                  onDelete={() =>
                    deleteAlert(
                      alert.id
                    )
                  }
                />
              )
            )}

          </div>

        )}

      </section>

      {/* SYSTEM LOGIC */}

      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
        }}
        className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      >

        <h2 className="text-xl font-semibold">
          Alert Detection Logic
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          The system evaluates incoming sensor
          readings and generates alerts when
          predefined safety thresholds are
          exceeded.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">

          <LogicCard
            title="Temperature"
            value="≥ 40°C"
            description="Warning condition"
          />

          <LogicCard
            title="Temperature"
            value="≥ 50°C"
            description="Critical condition"
          />

          <LogicCard
            title="Gas"
            value="≥ 1000 ppm"
            description="Warning condition"
          />

          <LogicCard
            title="Gas"
            value="≥ 1500 ppm"
            description="Critical condition"
          />

        </div>

      </motion.section>

    </main>
  );
}


// ----------------------------------
// SUMMARY CARD
// ----------------------------------

function SummaryCard({
  title,
  value,
  subtitle,
  danger = false,
}: {
  title: string;
  value: number;
  subtitle: string;
  danger?: boolean;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className={`rounded-2xl border p-6 ${
        danger
          ? "border-red-400/10 bg-red-400/[0.03]"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p
        className={`mt-3 text-3xl font-bold ${
          danger
            ? "text-red-400"
            : "text-white"
        }`}
      >
        {value}
      </p>

      <p className="mt-2 text-xs text-gray-600">
        {subtitle}
      </p>

    </motion.div>
  );
}


// ----------------------------------
// ALERT CARD
// ----------------------------------

function AlertCard({
  alert,
  index,
  onResolve,
  onDelete,
}: {
  alert: Alert;
  index: number;
  onResolve: () => void;
  onDelete: () => void;
}) {
  const isCritical =
    alert.severity === "Critical";

  const isActive =
    alert.status === "Active";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: index * 0.05,
      }}
      className={`rounded-2xl border p-5 ${
        isCritical && isActive
          ? "border-red-400/20 bg-red-400/[0.04]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        {/* LEFT */}

        <div className="flex gap-4">

          <div
            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              isCritical
                ? "bg-red-400/10 text-red-400"
                : "bg-yellow-400/10 text-yellow-400"
            }`}
          >
            !
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h3 className="font-semibold">
                {alert.title}
              </h3>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  alert.severity ===
                  "Critical"
                    ? "bg-red-400/10 text-red-400"
                    : alert.severity ===
                        "High"
                      ? "bg-orange-400/10 text-orange-400"
                      : "bg-yellow-400/10 text-yellow-400"
                }`}
              >
                {alert.severity}
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  isActive
                    ? "bg-red-400/10 text-red-400"
                    : "bg-green-400/10 text-green-400"
                }`}
              >
                {alert.status}
              </span>

            </div>

            <p className="mt-2 text-sm text-gray-400">
              {alert.location}
            </p>

            <p className="mt-1 text-xs text-gray-600">
              {alert.value}
            </p>

            <p className="mt-2 text-xs text-gray-600">
              {new Date(
                alert.timestamp
              ).toLocaleString()}
            </p>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="flex gap-2">

          {isActive && (
            <button
              onClick={onResolve}
              className="rounded-xl border border-green-400/20 bg-green-400/5 px-4 py-2 text-xs font-medium text-green-400 transition hover:bg-green-400/10"
            >
              Resolve
            </button>
          )}

          <button
            onClick={onDelete}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-gray-400 transition hover:bg-white/[0.07] hover:text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </motion.div>
  );
}


// ----------------------------------
// LOGIC CARD
// ----------------------------------

function LogicCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">

      <p className="text-xs text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-lg font-semibold">
        {value}
      </p>

      <p className="mt-1 text-xs text-gray-600">
        {description}
      </p>

    </div>
  );
}