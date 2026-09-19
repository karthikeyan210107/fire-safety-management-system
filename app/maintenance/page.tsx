"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { onValue, ref, set } from "firebase/database";
import { database } from "../firebase";

type SensorStatus = "WORKING" | "FAULTY" | "CHECKING";

type Sensor = {
  name: string;
  key: string;
  value: string | number;
  unit: string;
  status: SensorStatus;
  failures: number;
};

export default function MaintenancePage() {
  const [temperature, setTemperature] =
    useState<number | null>(null);

  const [gas, setGas] =
    useState<number | null>(null);

  const [flame, setFlame] =
    useState<number | null>(null);

  const [checking, setChecking] =
    useState(false);

  const [lastCheck, setLastCheck] =
    useState<string>("Not checked yet");

  const [statuses, setStatuses] =
    useState<Record<string, SensorStatus>>({
      temperature: "WORKING",
      gas: "WORKING",
      flame: "WORKING",
    });

  const [failures, setFailures] =
    useState<Record<string, number>>({
      temperature: 0,
      gas: 0,
      flame: 0,
    });

  // --------------------------------
  // LIVE FIREBASE SENSOR DATA
  // --------------------------------

  useEffect(() => {
    const tempRef = ref(
      database,
      "test/value"
    );

    const gasRef = ref(
      database,
      "sensors/gas/value"
    );

    const flameRef = ref(
      database,
      "sensors/flame/value"
    );

    const unsubscribeTemp = onValue(
      tempRef,
      (snapshot) => {
        const value = snapshot.val();

        if (
          typeof value === "number" &&
          !Number.isNaN(value)
        ) {
          setTemperature(value);
        }
      }
    );

    const unsubscribeGas = onValue(
      gasRef,
      (snapshot) => {
        const value = snapshot.val();

        if (
          typeof value === "number" &&
          !Number.isNaN(value)
        ) {
          setGas(value);
        }
      }
    );

    const unsubscribeFlame = onValue(
      flameRef,
      (snapshot) => {
        const value = snapshot.val();

        if (
          typeof value === "number" &&
          !Number.isNaN(value)
        ) {
          setFlame(value);
        }
      }
    );

    return () => {
      unsubscribeTemp();
      unsubscribeGas();
      unsubscribeFlame();
    };
  }, []);

  // --------------------------------
  // AUTOMATIC SENSOR HEALTH CHECK
  // --------------------------------

  useEffect(() => {
    const sensorValues = {
      temperature,
      gas,
      flame,
    };

    setFailures((previous) => {
      const updated = { ...previous };

      Object.entries(sensorValues).forEach(
        ([key, value]) => {
          const invalid =
            value === null ||
            value === undefined ||
            Number.isNaN(Number(value));

          if (invalid) {
            updated[key] = Math.min(
              (updated[key] || 0) + 1,
              3
            );
          } else {
            updated[key] = 0;
          }
        }
      );

      return updated;
    });
  }, [temperature, gas, flame]);

  // --------------------------------
  // UPDATE SENSOR STATUS
  // --------------------------------

  useEffect(() => {
    setStatuses((previous) => {
      const updated = { ...previous };

      Object.keys(failures).forEach((key) => {
        if (failures[key] >= 3) {
          updated[key] = "FAULTY";
        } else {
          updated[key] = "WORKING";
        }
      });

      return updated;
    });
  }, [failures]);

  // --------------------------------
  // CREATE FAULT ALERT
  // --------------------------------

  useEffect(() => {
    Object.entries(failures).forEach(
      ([key, count]) => {
        if (count >= 3) {
          const sensorName =
            key === "temperature"
              ? "Temperature Sensor"
              : key === "gas"
                ? "Gas / Smoke Sensor"
                : "Flame Sensor";

          createFaultAlert(sensorName);
        }
      }
    );
  }, [failures]);

  async function createFaultAlert(
    sensorName: string
  ) {
    try {
      const timestamp =
        new Date().toISOString();

      await set(
        ref(
          database,
          `alerts/sensorFault-${sensorName}`
        ),
        {
          title: `${sensorName} Fault Detected`,
          location:
            "Easwari Engineering College · Zone 1",
          value:
            "Sensor health check failed 3 times",
          severity: "Critical",
          status: "Active",
          timestamp,
          type: "SENSOR_FAULT",
        }
      );

      await set(
        ref(
          database,
          `maintenanceTickets/${sensorName.replaceAll(
            " ",
            "-"
          )}`
        ),
        {
          sensor: sensorName,
          location:
            "Easwari Engineering College · Zone 1",
          issue:
            "Sensor failed health check 3 consecutive times",
          priority: "HIGH",
          status: "OPEN",
          createdAt: timestamp,
        }
      );
    } catch (error) {
      console.error(
        "Failed to create sensor fault alert:",
        error
      );
    }
  }

  // --------------------------------
  // MANUAL 3-ATTEMPT HEALTH CHECK
  // --------------------------------

  async function runHealthCheck() {
    if (checking) return;

    setChecking(true);

    setStatuses({
      temperature: "CHECKING",
      gas: "CHECKING",
      flame: "CHECKING",
    });

    let temperatureFailures = 0;
    let gasFailures = 0;
    let flameFailures = 0;

    for (
      let attempt = 1;
      attempt <= 3;
      attempt++
    ) {
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const temperatureValid =
        temperature !== null &&
        !Number.isNaN(temperature);

      const gasValid =
        gas !== null &&
        !Number.isNaN(gas);

      const flameValid =
        flame !== null &&
        !Number.isNaN(flame);

      if (!temperatureValid) {
        temperatureFailures++;
      }

      if (!gasValid) {
        gasFailures++;
      }

      if (!flameValid) {
        flameFailures++;
      }
    }

    const newFailures = {
      temperature: temperatureFailures,
      gas: gasFailures,
      flame: flameFailures,
    };

    setFailures(newFailures);

    setStatuses({
      temperature:
        temperatureFailures >= 3
          ? "FAULTY"
          : "WORKING",

      gas:
        gasFailures >= 3
          ? "FAULTY"
          : "WORKING",

      flame:
        flameFailures >= 3
          ? "FAULTY"
          : "WORKING",
    });

    setLastCheck(
      new Date().toLocaleString()
    );

    setChecking(false);

    // Create alerts for failed sensors
    if (temperatureFailures >= 3) {
      await createFaultAlert(
        "Temperature Sensor"
      );
    }

    if (gasFailures >= 3) {
      await createFaultAlert(
        "Gas / Smoke Sensor"
      );
    }

    if (flameFailures >= 3) {
      await createFaultAlert(
        "Flame Sensor"
      );
    }
  }

  // --------------------------------
  // SENSOR DATA FOR UI
  // --------------------------------

  const sensors: Sensor[] = [
    {
      name: "Temperature Sensor",
      key: "temperature",
      value:
        temperature ?? "--",
      unit: "°C",
      status:
        statuses.temperature,
      failures:
        failures.temperature,
    },

    {
      name: "Gas / Smoke Sensor",
      key: "gas",
      value:
        gas ?? "--",
      unit: "ppm",
      status:
        statuses.gas,
      failures:
        failures.gas,
    },

    {
      name: "Flame Sensor",
      key: "flame",
      value:
        flame === 1
          ? "Detected"
          : flame === 0
            ? "Clear"
            : "--",
      unit: "",
      status:
        statuses.flame,
      failures:
        failures.flame,
    },
  ];

  const faultyCount =
    sensors.filter(
      (sensor) =>
        sensor.status === "FAULTY"
    ).length;

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
          <p className="mb-2 text-sm text-gray-500">
            FIRE SAFETY COMMAND CENTER
          </p>

          <h1 className="text-4xl font-bold">
            Sensor Health
          </h1>

          <p className="mt-2 text-gray-400">
            Monitor sensor reliability and detect hardware faults.
          </p>
        </div>

        <button
          onClick={runHealthCheck}
          disabled={checking}
          className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105 disabled:opacity-50"
        >
          {checking
            ? "Checking..."
            : "Run Health Check"}
        </button>
      </motion.div>

      {/* SUMMARY */}

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        <SummaryCard
          title="Sensors Online"
          value={`${3 - faultyCount}/3`}
          subtitle="Connected sensors"
        />

        <SummaryCard
          title="Faulty Sensors"
          value={faultyCount}
          subtitle="Require attention"
        />

        <SummaryCard
          title="Last Health Check"
          value={
            lastCheck ===
            "Not checked yet"
              ? "--"
              : "Completed"
          }
          subtitle={lastCheck}
        />

      </div>

      {/* SENSOR STATUS */}

      <section>

        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Sensor Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Live data from Firebase Realtime Database
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-green-400">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            LIVE

          </div>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {sensors.map(
            (sensor, index) => (

              <motion.div
                key={sensor.key}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -5,
                }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-sm text-gray-400">
                      {sensor.name}
                    </p>

                    <div className="mt-3 text-3xl font-bold">

                      {sensor.value}

                      <span className="ml-1 text-sm text-gray-500">
                        {sensor.unit}
                      </span>

                    </div>

                  </div>

                  <StatusBadge
                    status={sensor.status}
                  />

                </div>

                <div className="mt-6 border-t border-white/10 pt-5">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Health attempts
                    </span>

                    <span>
                      {sensor.failures}/3 failures
                    </span>

                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">

                    <motion.div
                      animate={{
                        width: `${Math.max(
                          0,
                          100 -
                            sensor.failures *
                              33.33
                        )}%`,
                      }}
                      className="h-full rounded-full bg-white"
                    />

                  </div>

                </div>

              </motion.div>

            )
          )}

        </div>

      </section>

      {/* AUTOMATIC HEALTH MONITORING */}

      <motion.section
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
        className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
      >

        <h2 className="text-xl font-semibold">
          Automatic Health Monitoring
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          The system continuously checks whether sensor data is valid.
          A sensor is marked faulty only after three failed checks.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">

          <LogicStep
            number="01"
            title="Monitor"
            description="Read sensor data continuously"
          />

          <LogicStep
            number="02"
            title="Verify"
            description="Check whether the reading is valid"
          />

          <LogicStep
            number="03"
            title="Retry ×3"
            description="Confirm the failure before acting"
          />

          <LogicStep
            number="04"
            title="Alert"
            description="Create fault alert and maintenance ticket"
          />

        </div>

      </motion.section>

      {/* FIREBASE PATH */}

      <div className="mt-6 text-xs text-gray-600">
        Firebase paths: test/value · sensors/gas/value · sensors/flame/value
      </div>

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
}: {
  title: string;
  value: string | number;
  subtitle: string;
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
    >

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-xs text-gray-600">
        {subtitle}
      </p>

    </motion.div>
  );
}


// ----------------------------------
// STATUS BADGE
// ----------------------------------

function StatusBadge({
  status,
}: {
  status: SensorStatus;
}) {
  const isFaulty =
    status === "FAULTY";

  const isChecking =
    status === "CHECKING";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        isFaulty
          ? "bg-red-500/10 text-red-400"
          : isChecking
            ? "bg-yellow-500/10 text-yellow-400"
            : "bg-green-500/10 text-green-400"
      }`}
    >
      {status}
    </span>
  );
}


// ----------------------------------
// LOGIC STEP
// ----------------------------------

function LogicStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">

      <div className="text-xs text-gray-600">
        {number}
      </div>

      <h3 className="mt-2 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-xs text-gray-500">
        {description}
      </p>

    </div>
  );
}