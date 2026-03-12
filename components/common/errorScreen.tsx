"use client";
import axios, { AxiosError } from "axios";
import { useTransition, useState } from "react";

interface ErrorScreenProps {
  error: Error | AxiosError;
  reset?: () => void;
}
export default function ErrorScreen({ error, reset }: ErrorScreenProps) {
  let message = "Something went wrong";

  if (axios.isAxiosError(error)) {
    message = error.response?.data?.message || error.message;
  } else {
    message = error.message;
  }

  const [isPending, startTransition] = useTransition();
  const [reloadKey, setReloadKey] = useState(0);

  const handleRetry = () => {
    startTransition(() => {
      setReloadKey((k) => k + 1);
      reset?.();
    });
  };

  console.log(message, "Error messa");
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800;900&family=DM+Sans:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.7); }
          65%  { transform: scale(1.06); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes signalPulse {
          0%, 100% { opacity: 0.07; transform: scale(1); }
          50%       { opacity: 0.14; transform: scale(1.03); }
        }
        @keyframes barFlicker {
          0%, 100% { opacity: 1; }
          45%       { opacity: 0.12; }
          50%       { opacity: 0.85; }
          55%       { opacity: 0.18; }
          60%       { opacity: 1; }
        }
        @keyframes dashSpin {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -60; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 28px 4px rgba(46,125,50,0.18); }
          50%       { box-shadow: 0 0 48px 12px rgba(46,125,50,0.32); }
        }
        @keyframes ringBreath {
          0%, 100% { opacity: 0.07; }
          50%       { opacity: 0.15; }
        }

        .err-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 480px;
          width: 100%;
          background: #303030;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* subtle grain overlay */
        .err-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }

        .bg-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          user-select: none;
        }
        .bg-text span {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(80px, 20vw, 200px);
          letter-spacing: -0.03em;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(46,125,50,0.12);
          line-height: 1;
          animation: signalPulse 4s ease-in-out infinite;
          white-space: nowrap;
        }

        .rings {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(46,125,50,0.1);
          animation: ringBreath 4s ease-in-out infinite;
        }

        .content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          text-align: center;
          padding: 0 24px;
        }

        .wifi-wrap {
          margin-bottom: 20px;
          animation: popIn 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;
        }

        .bar1 { animation: barFlicker 2.4s ease-in-out 0.0s infinite; }
        .bar2 { animation: barFlicker 2.4s ease-in-out 0.3s infinite; }
        .bar3 { animation: barFlicker 2.4s ease-in-out 0.6s infinite; }
        .bar4 { animation: barFlicker 2.4s ease-in-out 0.9s infinite; }

        .dash-ring {
          animation: dashSpin 3s linear infinite;
        }

        .oops {
          font-family: 'Syne', sans-serif;
          font-weight: 900;
          font-size: clamp(32px, 6vw, 52px);
          color: #2E7D32;
          letter-spacing: -0.02em;
          line-height: 1.1;
          animation: fadeSlideUp 0.6s ease 0.35s both;
        }
        .subtitle {
          font-size: clamp(15px, 2.5vw, 19px);
          font-weight: 400;
          color: #3a8a3e;
          letter-spacing: 0.04em;
          margin-top: 6px;
          animation: fadeSlideUp 0.6s ease 0.5s both;
        }
        .detail {
          font-size: 12px;
          color: rgba(46,125,50,0.6);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-top: 8px;
          animation: fadeSlideUp 0.6s ease 0.65s both;
        }

        .dots {
          display: flex;
          gap: 6px;
          margin-top: 20px;
          animation: fadeSlideUp 0.6s ease 0.75s both;
        }
        .dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(46,125,50,0.2);
        }
        .dot.active {
          background: #2E7D32;
        }

        .btn {
          margin-top: 28px;
          padding: 13px 40px;
          border-radius: 999px;
          border: none;
          background: #2E7D32;
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s, transform 0.18s, box-shadow 0.25s;
          animation: fadeSlideUp 0.6s ease 0.9s both, glowPulse 3s ease-in-out 1.5s infinite;
        }
        .btn:hover {
          background: #235f26;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(46,125,50,0.35);
        }
        .btn:active {
          transform: translateY(0px);
        }
      `}</style>

      <div className="err-wrap h-screen">
        {/* Signal rings */}
        <div className="rings">
          {[480, 360, 250, 150].map((s, i) => (
            <div
              key={i}
              className="ring"
              style={{ width: s, height: s, animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>

        {/* Giant ghost text */}
        <div className="bg-text">
          <span>NO SIGNAL</span>
        </div>

        {/* Main content */}
        <div className="content">
          {/* WiFi icon */}
          <div className="wifi-wrap">
            <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
              {/* dashed orbit */}
              <circle
                cx="48"
                cy="48"
                r="43"
                stroke="rgba(46,125,50,0.25)"
                strokeWidth="1.5"
                strokeDasharray="10 5"
                fill="none"
                className="dash-ring"
              />
              {/* icon bg */}
              <circle cx="48" cy="48" r="32" fill="white" />
              <circle cx="48" cy="48" r="32" fill="rgba(46,125,50,0.06)" />

              {/* wifi arcs */}
              <g className="bar1">
                <path
                  d="M28 44 C33 36 40 32 48 32 C56 32 63 36 68 44"
                  stroke="#2E7D32"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
              <g className="bar2">
                <path
                  d="M33 50 C37 44 42 41 48 41 C54 41 59 44 63 50"
                  stroke="#2E7D32"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
              <g className="bar3">
                <path
                  d="M38.5 56 C41.5 52 44.5 50 48 50 C51.5 50 54.5 52 57.5 56"
                  stroke="#2E7D32"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>
              {/* dot */}
              <g className="bar4">
                <circle cx="48" cy="62" r="3" fill="#2E7D32" />
              </g>

              {/* X slash — red tint on green bg looks right */}
              <line
                x1="24"
                y1="24"
                x2="72"
                y2="72"
                stroke="rgba(180,30,30,0.45)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h1 className="oops">Oops</h1>

          <p className="subtitle">
            {message === "Network Error"
              ? "Network Connection Lost"
              : error.message}
          </p>
          <p className="detail">
            {" "}
            {message === "Network Error"
              ? " Check your internet and try again"
              : "Something went wrong"}
          </p>

          <div className="dots">
            {[false, false, true, false, false].map((a, i) => (
              <div key={i} className={`dot${a ? "active" : ""}`} />
            ))}
          </div>

          <button className="btn" onClick={handleRetry} disabled={isPending}>
            {isPending ? (
              <>
                <span className="spinner" />
                Retrying…
              </>
            ) : (
              "Try Again"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
