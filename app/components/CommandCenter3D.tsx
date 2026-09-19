"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { database } from "../firebase";

type Status = "SAFE" | "WARNING" | "DANGER";

type Zone = {
  id: string;
  name: string;
  temp: number;
  gas: number;
  flame: boolean;
  status: Status;
  position: [number, number, number];
};

const defaultZones: Zone[] = [
  {
    id: "zone-1",
    name: "Zone 01",
    temp: 28,
    gas: 420,
    flame: false,
    status: "SAFE",
    position: [-3, 0.8, 2],
  },
  {
    id: "zone-2",
    name: "Zone 02",
    temp: 31,
    gas: 720,
    flame: false,
    status: "SAFE",
    position: [3, 0.8, 2],
  },
  {
    id: "zone-3",
    name: "Zone 03",
    temp: 42,
    gas: 1180,
    flame: false,
    status: "WARNING",
    position: [-3, 0.8, -2],
  },
  {
    id: "zone-4",
    name: "Zone 04",
    temp: 29,
    gas: 350,
    flame: false,
    status: "SAFE",
    position: [3, 0.8, -2],
  },
];

function getStatus(
  temperature: number,
  gas: number,
  flame: boolean
): Status {
  if (flame) {
    return "DANGER";
  }

  if (temperature >= 50 || gas >= 1500) {
    return "DANGER";
  }

  if (temperature >= 40 || gas >= 1000) {
    return "WARNING";
  }

  return "SAFE";
}

function SensorPoint({
  zone,
  selected,
  onClick,
}: {
  zone: Zone;
  selected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const speed =
      zone.status === "DANGER" ? 7 : 3;

    const pulse =
      1 + Math.sin(clock.elapsedTime * speed) * 0.15;

    meshRef.current.scale.setScalar(
      selected ? 1.5 : pulse
    );
  });

  const color =
    zone.status === "DANGER"
      ? "#ff3030"
      : zone.status === "WARNING"
        ? "#ffd43b"
        : "#39ff88";

  return (
    <group position={zone.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.22, 24, 24]} />

        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={
            zone.status === "DANGER" ? 5 : 3
          }
        />
      </mesh>

      <pointLight
        color={color}
        intensity={selected ? 5 : 2}
        distance={3}
      />

      {selected && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.55, 32]} />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
    </group>
  );
}

function Building({
  zones,
  selectedZone,
  setSelectedZone,
}: {
  zones: Zone[];
  selectedZone: string;
  setSelectedZone: (id: string) => void;
}) {
  return (
    <group>
      {/* BASE */}

      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[10, 0.3, 7]} />

        <meshStandardMaterial
          color="#0c1117"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* MAIN BUILDING */}

      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[8, 3, 5.5]} />

        <meshStandardMaterial
          color="#111923"
          metalness={0.65}
          roughness={0.25}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* HORIZONTAL LINES */}

      <mesh position={[0, 1.5, 2.78]}>
        <boxGeometry args={[8.2, 0.05, 0.08]} />
        <meshBasicMaterial color="#1ddcff" />
      </mesh>

      <mesh position={[0, 0.7, 2.78]}>
        <boxGeometry args={[8.2, 0.05, 0.08]} />
        <meshBasicMaterial color="#1ddcff" />
      </mesh>

      <mesh position={[0, 2.3, 2.78]}>
        <boxGeometry args={[8.2, 0.05, 0.08]} />
        <meshBasicMaterial color="#1ddcff" />
      </mesh>

      {/* VERTICAL LINES */}

      {[-3.8, 0, 3.8].map((x) => (
        <mesh
          key={`vertical-${x}`}
          position={[x, 1.5, 2.8]}
        >
          <boxGeometry args={[0.08, 3, 0.1]} />
          <meshBasicMaterial color="#246b7d" />
        </mesh>
      ))}

      {/* ROOF */}

      <mesh position={[0, 3.15, 0]}>
        <boxGeometry args={[8.5, 0.18, 6]} />

        <meshStandardMaterial
          color="#17222e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* CENTER STRUCTURE */}

      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.05, 3, 5.6]} />
        <meshBasicMaterial color="#214452" />
      </mesh>

      {/* FLOOR */}

      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[8, 0.04, 5.5]} />
        <meshBasicMaterial color="#214452" />
      </mesh>

      {/* SENSOR POINTS */}

      {zones.map((zone) => (
        <SensorPoint
          key={zone.id}
          zone={zone}
          selected={selectedZone === zone.id}
          onClick={() => setSelectedZone(zone.id)}
        />
      ))}
    </group>
  );
}

export default function CommandCenter3D() {
  const [selectedZone, setSelectedZone] =
    useState("zone-1");

  const [zones, setZones] =
    useState<Zone[]>(defaultZones);

  const [firebaseConnected, setFirebaseConnected] =
    useState(false);

  // --------------------------------
  // REAL FIREBASE SENSOR DATA
  // --------------------------------

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

    let temperature = 28;
    let gas = 420;
    let flame = false;

    const updateZone = () => {
      const status = getStatus(
        temperature,
        gas,
        flame
      );

      setZones((previous) => {
        const updated = [...previous];

        updated[0] = {
          ...updated[0],
          temp: temperature,
          gas,
          flame,
          status,
        };

        return updated;
      });
    };

    const unsubscribeTemperature = onValue(
      temperatureRef,
      (snapshot) => {
        const value = snapshot.val();

        if (
          typeof value === "number" &&
          !Number.isNaN(value)
        ) {
          temperature = value;
          updateZone();
          setFirebaseConnected(true);
        }
      },
      (error) => {
        console.error(
          "Temperature Firebase error:",
          error
        );

        setFirebaseConnected(false);
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
          gas = value;
          updateZone();
          setFirebaseConnected(true);
        }
      },
      (error) => {
        console.error(
          "Gas Firebase error:",
          error
        );

        setFirebaseConnected(false);
      }
    );

    const unsubscribeFlame = onValue(
      flameRef,
      (snapshot) => {
        const value = snapshot.val();

        if (
          value === 1 ||
          value === "1" ||
          value === true ||
          value === "true"
        ) {
          flame = true;
        } else if (
          value === 0 ||
          value === "0" ||
          value === false ||
          value === "false"
        ) {
          flame = false;
        }

        updateZone();
        setFirebaseConnected(true);
      },
      (error) => {
        console.error(
          "Flame Firebase error:",
          error
        );

        setFirebaseConnected(false);
      }
    );

    return () => {
      unsubscribeTemperature();
      unsubscribeGas();
      unsubscribeFlame();
    };
  }, []);

  const activeZone =
    zones.find(
      (zone) => zone.id === selectedZone
    ) ?? zones[0];

  const statusColor =
    activeZone.status === "DANGER"
      ? "text-red-400"
      : activeZone.status === "WARNING"
        ? "text-yellow-400"
        : "text-emerald-400";

  return (
    <div className="relative h-[680px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#05080c]">

      {/* HEADER */}

      <div className="pointer-events-none absolute left-6 top-5 z-20">

        <div className="text-xs tracking-[0.35em] text-cyan-400">
          FIRE SAFETY SYSTEM
        </div>

        <div className="mt-1 text-2xl font-semibold text-white">
          DIGITAL COMMAND CENTER
        </div>

        <div className="mt-1 text-xs text-zinc-500">
          Interactive Building Digital Twin
        </div>

      </div>

      {/* FIREBASE STATUS */}

      <div
        className={`absolute right-6 top-5 z-20 rounded-xl border px-4 py-3 backdrop-blur-xl ${
          firebaseConnected
            ? "border-emerald-400/20 bg-emerald-400/5"
            : "border-red-400/20 bg-red-400/5"
        }`}
      >
        <div className="flex items-center gap-2">

          <span
            className={`h-2 w-2 animate-pulse rounded-full ${
              firebaseConnected
                ? "bg-emerald-400"
                : "bg-red-400"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              firebaseConnected
                ? "text-emerald-300"
                : "text-red-300"
            }`}
          >
            {firebaseConnected
              ? "FIREBASE LIVE"
              : "FIREBASE OFFLINE"}
          </span>

        </div>
      </div>

      {/* ZONE CONTROL */}

      <div className="absolute right-6 top-24 z-20 w-64 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl">

        <div className="mb-3 text-xs tracking-[0.2em] text-zinc-500">
          ZONE CONTROL
        </div>

        <div className="space-y-2">

          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() =>
                setSelectedZone(zone.id)
              }
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left transition ${
                selectedZone === zone.id
                  ? "border-cyan-400/40 bg-cyan-400/10"
                  : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
              }`}
            >

              <div>

                <div className="text-sm font-medium text-white">
                  {zone.name}
                </div>

                <div className="mt-1 text-[10px] text-zinc-500">
                  {zone.temp}°C • {zone.gas} ppm
                </div>

              </div>

              <span
                className={`h-2 w-2 rounded-full ${
                  zone.status === "DANGER"
                    ? "bg-red-400"
                    : zone.status === "WARNING"
                      ? "bg-yellow-400"
                      : "bg-emerald-400"
                }`}
              />

            </button>
          ))}

        </div>
      </div>

      {/* SELECTED ZONE */}

      <div className="absolute bottom-6 left-6 z-20 w-80 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-xl">

        <div className="text-xs tracking-widest text-zinc-500">
          SELECTED ZONE
        </div>

        <div className="mt-1 flex items-center justify-between">

          <div className="text-xl font-semibold text-white">
            {activeZone.name}
          </div>

          <div
            className={`text-xs font-semibold ${statusColor}`}
          >
            {activeZone.status}
          </div>

        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">

          <div>

            <div className="text-[10px] text-zinc-500">
              TEMP
            </div>

            <div className="mt-1 text-lg text-white">
              {activeZone.temp}°C
            </div>

          </div>

          <div>

            <div className="text-[10px] text-zinc-500">
              GAS
            </div>

            <div className="mt-1 text-lg text-white">
              {activeZone.gas}
            </div>

          </div>

          <div>

            <div className="text-[10px] text-zinc-500">
              FLAME
            </div>

            <div
              className={`mt-1 text-sm ${
                activeZone.flame
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {activeZone.flame
                ? "DETECTED"
                : "CLEAR"}
            </div>

          </div>

        </div>

        <div className="mt-4 border-t border-white/5 pt-3">

          <div className="flex items-center justify-between">

            <span className="text-xs text-zinc-500">
              SENSOR HEALTH
            </span>

            <span className="text-xs text-emerald-400">
              ONLINE
            </span>

          </div>

        </div>

      </div>

      {/* HELP */}

      <div className="absolute bottom-6 right-6 z-20 rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-zinc-500 backdrop-blur-xl">
        DRAG TO ROTATE • SCROLL TO ZOOM • CLICK SENSOR
      </div>

      {/* 3D WORLD */}

      <Canvas
        camera={{
          position: [9, 7, 10],
          fov: 45,
        }}
        dpr={[1, 2]}
      >

        <color
          attach="background"
          args={["#05080c"]}
        />

        <ambientLight intensity={0.4} />

        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
        />

        <pointLight
          position={[0, 4, 0]}
          intensity={4}
          color="#1ddcff"
        />

        <Stars
          radius={50}
          depth={30}
          count={1200}
          factor={2}
          saturation={0}
          fade
          speed={0.4}
        />

        <Building
          zones={zones}
          selectedZone={selectedZone}
          setSelectedZone={setSelectedZone}
        />

        <OrbitControls
          enablePan={false}
          minDistance={7}
          maxDistance={18}
          minPolarAngle={0.6}
          maxPolarAngle={1.5}
        />

        <gridHelper
          args={[
            30,
            30,
            "#12303a",
            "#09151b",
          ]}
          position={[0, -0.28, 0]}
        />

      </Canvas>

    </div>
  );
}