"use client";

import { onValue, ref, set } from "firebase/database";
import { useEffect, useRef } from "react";
import { database } from "../firebase";

const CHECK_INTERVAL = 3000;
const SENSOR_TIMEOUT = 10000;
const MAX_FAILURES = 3;

type SensorState = {
  lastUpdate: number;
  failures: number;
  faultCreated: boolean;
};

export default function SensorHealthMonitor() {
  const sensors = useRef<Record<string, SensorState>>({
    temperature: {
      lastUpdate: Date.now(),
      failures: 0,
      faultCreated: false,
    },

    gas: {
      lastUpdate: Date.now(),
      failures: 0,
      faultCreated: false,
    },

    flame: {
      lastUpdate: Date.now(),
      failures: 0,
      faultCreated: false,
    },
  });

  useEffect(() => {
    const temperatureRef = ref(
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

    /*
     * ---------------------------------------------------------
     * UPDATE SENSOR HEALTH
     * ---------------------------------------------------------
     */

    function markSensorWorking(
      sensorName: string
    ) {
      const sensor = sensors.current[sensorName];

      if (!sensor) {
        return;
      }

      sensor.lastUpdate = Date.now();
      sensor.failures = 0;
      sensor.faultCreated = false;
    }

    /*
     * ---------------------------------------------------------
     * CREATE SENSOR FAULT ALERT
     * ---------------------------------------------------------
     */

    async function createFaultAlert(
      sensorName: string
    ) {
      const sensor = sensors.current[sensorName];

      if (!sensor || sensor.faultCreated) {
        return;
      }

      sensor.faultCreated = true;

      const timestamp =
        new Date().toISOString();

      const alertId =
        `SENSOR_FAULT_${sensorName}_${Date.now()}`;

      try {
        await set(
          ref(
            database,
            `alerts/${alertId}`
          ),
          {
            title: `${sensorName.toUpperCase()} Sensor Fault`,

            location:
              "Easwari Engineering College · Zone 1",

            value:
              `No data received from ${sensorName} sensor for more than ${SENSOR_TIMEOUT / 1000} seconds`,

            severity: "High",

            status: "Active",

            timestamp,

            type: "SENSOR_FAULT",

            sensor: sensorName,
          }
        );

        /*
         * Also create maintenance ticket
         */

        const ticketId =
          `TICKET_${sensorName}_${Date.now()}`;

        await set(
          ref(
            database,
            `maintenanceTickets/${ticketId}`
          ),
          {
            sensor: sensorName,

            location:
              "Easwari Engineering College · Zone 1",

            issue:
              `${sensorName} sensor is not sending data`,

            status: "Pending",

            priority: "High",

            createdAt: timestamp,

            source: "Automatic Sensor Health Monitor",
          }
        );

        console.log(
          `${sensorName} sensor fault detected`
        );
      } catch (error) {
        console.error(
          "Failed to create sensor fault:",
          error
        );

        sensor.faultCreated = false;
      }
    }

    /*
     * ---------------------------------------------------------
     * TEMPERATURE
     * ---------------------------------------------------------
     */

    const unsubscribeTemperature =
      onValue(
        temperatureRef,
        (snapshot) => {
          const value = snapshot.val();

          if (typeof value === "number") {
            markSensorWorking(
              "temperature"
            );
          }
        },
        (error) => {
          console.error(
            "Temperature sensor error:",
            error
          );
        }
      );

    /*
     * ---------------------------------------------------------
     * GAS
     * ---------------------------------------------------------
     */

    const unsubscribeGas =
      onValue(
        gasRef,
        (snapshot) => {
          const value = snapshot.val();

          if (typeof value === "number") {
            markSensorWorking("gas");
          }
        },
        (error) => {
          console.error(
            "Gas sensor error:",
            error
          );
        }
      );

    /*
     * ---------------------------------------------------------
     * FLAME
     * ---------------------------------------------------------
     */

    const unsubscribeFlame =
      onValue(
        flameRef,
        (snapshot) => {
          const value =
            snapshot.val();

          const valid =
            value === true ||
            value === false ||
            value === 1 ||
            value === 0 ||
            value === "1" ||
            value === "0" ||
            value === "true" ||
            value === "false";

          if (valid) {
            markSensorWorking(
              "flame"
            );
          }
        },
        (error) => {
          console.error(
            "Flame sensor error:",
            error
          );
        }
      );

    /*
     * ---------------------------------------------------------
     * PERIODIC HEALTH CHECK
     * ---------------------------------------------------------
     */

    const healthChecker =
      setInterval(() => {
        const now = Date.now();

        Object.entries(
          sensors.current
        ).forEach(
          ([sensorName, sensor]) => {
            const elapsed =
              now - sensor.lastUpdate;

            /*
             * Sensor has stopped sending data
             */

            if (
              elapsed >
              SENSOR_TIMEOUT
            ) {
              sensor.failures++;

              console.warn(
                `${sensorName} sensor check failed: ${sensor.failures}/${MAX_FAILURES}`
              );

              /*
               * Three consecutive failures
               */

              if (
                sensor.failures >=
                MAX_FAILURES
              ) {
                createFaultAlert(
                  sensorName
                );
              }
            }
          }
        );
      }, CHECK_INTERVAL);

    /*
     * ---------------------------------------------------------
     * CLEANUP
     * ---------------------------------------------------------
     */

    return () => {
      unsubscribeTemperature();

      unsubscribeGas();

      unsubscribeFlame();

      clearInterval(
        healthChecker
      );
    };
  }, []);

  return null;
}