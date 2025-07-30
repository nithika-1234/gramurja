    import React, { useEffect, useState } from "react";

const SPARK_COUNT = 30;

const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

interface Spark {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  fallX: number;
  rotation: number;
}

const SuccessNotification: React.FC = () => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    // Generate sparks info for animation
    const newSparks: Spark[] = [];
    for (let i = 0; i < SPARK_COUNT; i++) {
      newSparks.push({
        id: i,
        left: randomRange(5, 95), // percent left position
        delay: randomRange(0, 5000), // ms delay before falling
        duration: randomRange(2000, 4000), // ms duration of falling
        size: randomRange(4, 10), // px size of spark
        fallX: randomRange(-50, 50), // horizontal drift px while falling
        rotation: randomRange(0, 360), // initial rotation deg
      });
    }
    setSparks(newSparks);
  }, []);

  return (
    <>
      <style>{`
        .overlay {
          position: fixed;
          top:0; left:0; right:0; bottom:0;
          background: rgba(255 255 255 / 0.85);
          backdrop-filter: blur(6px);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          z-index: 1000;
          padding: 1rem;
          box-sizing: border-box;
        }
        .card {
          position: relative;
          background: white;
          border-radius: 24px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          width: 320px;
          max-width: 100%;
          padding: 2.4rem 2rem 2.8rem;
          text-align: center;
          overflow: visible;
        }
        .title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 0.6rem;
          user-select: none;
        }
        .subtitle {
          font-size: 0.95rem;
          color: #666;
          margin-bottom: 2rem;
          user-select: none;
        }

        /* Tick circle container and animation */
        .circle {
          background: #00fd48ff;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          margin: 0 auto 2rem;
          position: relative;
          box-shadow:
             inset 0 4px 8px rgba(34,139,34,0.15),
             0 4px 8px rgba(34,139,34,0.25);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: ascend 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes ascend {
          0% {
            transform: translateY(50px) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        /* Checkmark styling and drawing */
        .checkmark {
          width: 56px;
          height: 56px;
          stroke: #ffffffff;
          stroke-width: 4;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: drawCheck 0.6s ease forwards 0.8s;
          user-select: none;
        }

        @keyframes drawCheck {
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Sparks container */
        .sparks-container {
          pointer-events: none;
          position: absolute;
          top: -60px;
          left: 0;
          width: 100%;
          height: 160px;
          overflow: visible;
          z-index: 10;
          user-select: none;
        }

        /* Individual spark */
        .spark {
          position: absolute;
          top: 0;
          background: radial-gradient(circle at center, #22a244, #117a1a);
          border-radius: 50%;
          opacity: 0.8;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
          filter: drop-shadow(0 0 2px #22a244bb);
          user-select: none;
        }

        @keyframes fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(150px) translateX(var(--fall-x)) rotate(360deg);
            opacity: 0;
          }
        }

        /* Button styling */
        .btn {
          background-color: #22a244;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.9rem;
          border-radius: 12px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          user-select: none;
          display: inline-block;
          min-width: 140px;
          box-shadow: 0 4px 10px rgb(34 162 68 / 0.4);
        }

        .btn:hover, .btn:focus {
          background-color: #1c7b31;
          outline: none;
        }
        .btn:active {
          background-color: #166026;
          box-shadow: 0 2px 6px rgb(34 130 45 / 0.6);
        }
      `}</style>

      <div className="overlay" role="alert" aria-live="polite" aria-atomic="true">
        <div className="card">
          <div className="sparks-container" aria-hidden="true">
            {sparks.map(({ id, left, delay, duration, size, fallX, rotation }) => (
              <div
                key={id}
                className="spark"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  animationDelay: `${delay}ms`,
                  animationDuration: `${duration}ms`,
                  transform: `rotate(${rotation}deg)`,
                  "--fall-x": `${fallX}px`,
                } as React.CSSProperties & Record<string, any>}
                onError={(e: React.SyntheticEvent<HTMLDivElement>) => {
                  // fallback if needed
                }}
              />
            ))}
          </div>

          <div className="circle" aria-hidden="true">
            <svg
              className="checkmark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="none"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M6 12.3l4 4.5 8-12" />
            </svg>
          </div>
          <h1 className="title">Congratulations!</h1>
          <p className="subtitle">You have passed the test in 30 minutes</p>
          <button className="btn" onClick={() => window.location.reload()}>
            ONCE AGAIN
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessNotification;