import { useRef } from 'react';

const LOCATIONS = [
  { x: 112, y: 205 },
  { x: 204, y: 145 },
  { x: 298, y: 213 },
  { x: 372, y: 132 },
];

const ROUTES = [
  'M112 205 C138 176 165 156 204 145',
  'M204 145 C236 160 267 188 298 213',
  'M298 213 C323 185 349 158 372 132',
];

function GlobeLines() {
  return (
    <g
      fill="none"
      stroke="rgba(170,205,255,0.12)"
      strokeWidth="0.65"
    >
      <ellipse cx="242" cy="180" rx="176" ry="178" />
      <ellipse cx="242" cy="180" rx="126" ry="178" />
      <ellipse cx="242" cy="180" rx="70" ry="178" />
      <ellipse cx="242" cy="180" rx="25" ry="178" />

      <ellipse cx="242" cy="180" rx="176" ry="124" />
      <ellipse cx="242" cy="180" rx="176" ry="74" />
      <ellipse cx="242" cy="180" rx="176" ry="25" />
    </g>
  );
}

function LandMasses() {
  return (
    <g
      fill="rgba(120,170,235,0.045)"
      stroke="rgba(150,195,255,0.065)"
      strokeWidth="0.65"
    >
      <path d="M113 94 C130 77 151 72 166 84 L160 101 L173 113 L159 129 L139 124 L126 137 L110 126 L103 108 Z" />

      <path d="M178 126 L199 118 L220 127 L226 148 L215 162 L221 182 L207 204 L192 198 L188 177 L174 163 L181 146 Z" />

      <path d="M245 83 L267 76 L285 87 L279 103 L294 114 L282 129 L261 125 L252 111 L237 104 Z" />

      <path d="M282 145 L302 137 L322 146 L331 165 L319 179 L324 196 L309 215 L294 204 L288 185 L276 172 Z" />

      <path d="M341 91 L361 82 L380 92 L376 108 L391 119 L382 135 L361 131 L351 116 L337 108 Z" />
    </g>
  );
}

export default function JourneyGlobe({
  items = [],
  onHoverChange,
}) {
  const hitAreaRef = useRef(null);

  const locations = items.map((item, index) => ({
    ...item,
    ...(LOCATIONS[index] ||
      LOCATIONS[LOCATIONS.length - 1]),
  }));

  const handleEnter = () => {
    onHoverChange?.(true);
  };

  const handleLeave = () => {
    onHoverChange?.(false);
  };

  return (
    <div
      ref={hitAreaRef}
      className="absolute left-1/2 top-1/2 aspect-square w-[min(88%,560px)] -translate-x-1/2 -translate-y-1/2"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="relative h-full w-full cursor-crosshair"
        style={{
          clipPath: 'circle(50% at 50% 50%)',
          WebkitClipPath: 'circle(50% at 50% 50%)',
        }}
      >
        <svg
          viewBox="0 0 484 360"
          className="journey-globe-rotation absolute left-1/2 top-1/2 h-[calc(100%+8%)] w-[calc(100%+8%)] -translate-x-1/2 -translate-y-1/2 overflow-visible transform-gpu"
          aria-hidden="true"
          style={{
            transformOrigin: '50% 50%',
            transformPerspective: 900,
          }}
        >
          <defs>
            <radialGradient id="journey-globe-fill">
              <stop
                offset="0%"
                stopColor="rgba(45,85,140,0.12)"
              />

              <stop
                offset="70%"
                stopColor="rgba(20,35,55,0.055)"
              />

              <stop
                offset="100%"
                stopColor="rgba(0,0,0,0)"
              />
            </radialGradient>

            <radialGradient id="journey-globe-light">
              <stop
                offset="0%"
                stopColor="rgba(125,180,255,0.12)"
              />

              <stop
                offset="100%"
                stopColor="rgba(125,180,255,0)"
              />
            </radialGradient>

            <filter id="journey-globe-blur">
              <feGaussianBlur stdDeviation="5" />
            </filter>

            <filter id="journey-signal-glow">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>

            <clipPath id="journey-globe-clip">
              <circle cx="242" cy="180" r="176" />
            </clipPath>
          </defs>

          {/* Outer rim */}
          <circle
            cx="242"
            cy="180"
            r="184"
            fill="none"
            stroke="rgba(150,195,255,0.045)"
            strokeWidth="1"
          />

          {/* Globe body */}
          <circle
            cx="242"
            cy="180"
            r="176"
            fill="url(#journey-globe-fill)"
            stroke="rgba(175,210,255,0.15)"
            strokeWidth="1"
          />

          {/* Soft light */}
          <circle
            cx="190"
            cy="125"
            r="110"
            fill="url(#journey-globe-light)"
            filter="url(#journey-globe-blur)"
          />

          <g clipPath="url(#journey-globe-clip)">
            <GlobeLines />
            <LandMasses />

            <g className="journey-routes">
              {ROUTES.map((path, index) => (
                <g key={path}>
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(90,155,255,0.06)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="journey-route-glow"
                  />

                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(125,185,255,0.5)"
                    strokeWidth="1.15"
                    strokeLinecap="round"
                    strokeDasharray="500"
                    strokeDashoffset="500"
                    opacity="0"
                    className="journey-route-segment"
                    data-segment={index}
                  />
                </g>
              ))}

              {/* Moving travel signal */}
              <circle
                className="journey-moving-signal-glow"
                cx="0"
                cy="0"
                r="8"
                fill="rgba(135,190,255,0.18)"
                filter="url(#journey-signal-glow)"
              />

              <circle
                className="journey-moving-signal"
                cx="0"
                cy="0"
                r="2.6"
                fill="rgba(205,230,255,0.95)"
              />

              {/* Locations */}
              {locations.map((location, index) => (
                <g
                  key={`${location.period || index}-${index}`}
                  className="journey-location-marker"
                  transform={`translate(${location.x} ${location.y})`}
                  opacity={index === 0 ? 1 : 0.15}
                >
                  <circle
                    r="11"
                    fill="rgba(90,155,255,0.035)"
                    stroke="rgba(150,200,255,0.1)"
                  />

                  <circle
                    r="5"
                    fill="none"
                    stroke="rgba(150,200,255,0.12)"
                    strokeDasharray="2 4"
                  />

                  <circle
                    r="2.4"
                    fill="rgba(190,220,255,0.9)"
                  />

                  <circle
                    r="1"
                    fill="rgba(255,255,255,1)"
                  />
                </g>
              ))}
            </g>
          </g>

          {/* Front rim */}
          <circle
            cx="242"
            cy="180"
            r="176"
            fill="none"
            stroke="rgba(170,210,255,0.075)"
            strokeWidth="1"
          />

          {/* Subtle highlight */}
          <path
            d="M102 106 C143 54 208 22 276 28"
            fill="none"
            stroke="rgba(210,230,255,0.065)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>

        {/* Transition orbit */}
        <div className="journey-transition-orbit pointer-events-none absolute left-1/2 top-1/2 h-[103%] w-[103%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-200/[0.035]" />
      </div>
    </div>
  );
}