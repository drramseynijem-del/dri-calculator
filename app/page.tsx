"use client";

import { useState } from "react";

export default function DRICalculatorPage() {
  const [jumpHeight, setJumpHeight] = useState("");
  const [dropHeight, setDropHeight] = useState("");
  const [contactTime, setContactTime] = useState("");
  const [dri, setDri] = useState<string | null>(null);
  const [rsi, setRsi] = useState<string | null>(null);

  const GRAVITY = 9.81;
  const INCH_TO_METER = 0.0254;

  const calculateMetrics = () => {
    const hJumpM = parseFloat(jumpHeight) * INCH_TO_METER;
    const hDropM = parseFloat(dropHeight) * INCH_TO_METER;
    const tc = parseFloat(contactTime);

    if (isNaN(hJumpM) || isNaN(hDropM) || isNaN(tc) || tc <= 0) {
      setDri(null);
      setRsi(null);
      return;
    }

    const totalDisplacement = hJumpM + hDropM;
    const driResult = totalDisplacement / (GRAVITY * tc * tc);
    const rsiResult = hJumpM / tc;

    setDri(driResult.toFixed(2));
    setRsi(rsiResult.toFixed(2));
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">
          Dynamic Rebound Index (DRI) Calculator
        </h1>

        <p className="text-center text-sm text-gray-500">
          Measures effective athletic reactivity by accounting for displacement and time under gravity.
        </p>

        <details className="rounded-lg border p-3 text-sm">
          <summary className="cursor-pointer font-medium">
            How to use this calculator
          </summary>
          <div className="mt-2 space-y-2 text-gray-500">
            <p>1) Enter jump height in inches.</p>
            <p>2) Enter drop height in inches (use 0 for CMJs).</p>
            <p>3) Enter ground contact time in seconds.</p>
            <p>DRI is the primary output. RSI is shown automatically for reference.</p>
          </div>
        </details>

        <input
          type="number"
          placeholder="Jump Height (inches)"
          className="w-full rounded border p-2"
          value={jumpHeight}
          onChange={(e) => setJumpHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Drop Height (inches, 0 if none)"
          className="w-full rounded border p-2"
          value={dropHeight}
          onChange={(e) => setDropHeight(e.target.value)}
        />

        <input
          type="number"
          placeholder="Contact Time (seconds)"
          className="w-full rounded border p-2"
          value={contactTime}
          onChange={(e) => setContactTime(e.target.value)}
        />

        <button
          onClick={calculateMetrics}
          className="w-full rounded bg-black text-white py-2 font-medium"
        >
          Calculate
        </button>

        {dri && (
          <div className="text-center pt-4 space-y-2">
            <div>
              <p className="text-sm text-gray-500">Dynamic Rebound Index</p>
              <p className="text-3xl font-bold">{dri}</p>
            </div>

            <div className="border-t pt-2">
              <p className="text-sm text-gray-500">
                Reactive Strength Index (auto-calculated)
              </p>
              <p className="text-lg font-semibold">{rsi}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
