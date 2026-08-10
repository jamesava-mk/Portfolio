import React, { useMemo } from "react";
import { motion } from "framer-motion";

// ---------------------------------------------------------------------------
// Config — defaults for each shape type. Kept outside the component so the
// counts/sizes/colors can be tuned without touching any layout or animation
// logic, and so a consumer can override just the pieces it needs via props.
// ---------------------------------------------------------------------------
const DEFAULTS = {
  squares: 3,
  circles: 3,
  dots: 10,
  squareColor: "border-white/15 bg-white/[0.03]",
  circleColor: "border-indigo-400/30 bg-indigo-400/5",
  dotColor: "bg-fuchsia-300",
};

// Movement is intentionally slow and small — this is ambient background
// motion, not an accent animation meant to draw the eye. Ranges below are
// randomized per-shape (within these bounds) so instances don't all move
// in visible lockstep.
const DURATION_RANGE = [14, 26]; // seconds per drift cycle
const DRIFT_RANGE = [12, 28]; // px of travel on each axis
const ROTATE_RANGE = [6, 16]; // degrees of sway, squares only

const randomBetween = (min, max) => Math.random() * (max - min) + min;

/**
 * Generates one shape's static properties (position, size, timing) once.
 * Separated from render so the randomization logic is easy to read and
 * test independently of JSX.
 */
function makeShape(type, id) {
  return {
    id,
    type,
    top: `${randomBetween(5, 90)}%`,
    left: `${randomBetween(5, 90)}%`,
    duration: randomBetween(...DURATION_RANGE),
    delay: randomBetween(0, 6),
    driftX: randomBetween(...DRIFT_RANGE) * (Math.random() > 0.5 ? 1 : -1),
    driftY: randomBetween(...DRIFT_RANGE) * (Math.random() > 0.5 ? 1 : -1),
    rotate: randomBetween(...ROTATE_RANGE),
  };
}

/**
 * FloatingShapes
 *
 * A purely decorative, reusable layer of slowly drifting squares, circles,
 * and small glowing dots — no text, no interaction. Meant to sit behind
 * real content as an absolutely-positioned fill (typically alongside
 * AnimatedBackground) to add depth without competing for attention.
 *
 * Usage:
 *   <section className="relative">
 *     <FloatingShapes />
 *     <div className="relative z-10"> ...content... </div>
 *   </section>
 *
 * All shape counts and colors are overridable via props so the same
 * component can be reused with a different density/palette elsewhere
 * (e.g. fewer, dimmer shapes behind a footer).
 */
export default function FloatingShapes({
  squares = DEFAULTS.squares,
  circles = DEFAULTS.circles,
  dots = DEFAULTS.dots,
  squareColor = DEFAULTS.squareColor,
  circleColor = DEFAULTS.circleColor,
  dotColor = DEFAULTS.dotColor,
  className = "",
}) {
  // Generated once via useMemo — without this, any re-render of a parent
  // component (e.g. a sibling with fast-changing state) would re-roll
  // every shape's position, and they'd visibly teleport instead of drift.
  const shapeList = useMemo(
    () => [
      ...Array.from({ length: squares }, (_, i) => makeShape("square", `sq-${i}`)),
      ...Array.from({ length: circles }, (_, i) => makeShape("circle", `ci-${i}`)),
      ...Array.from({ length: dots }, (_, i) => makeShape("dot", `dt-${i}`)),
    ],
    [squares, circles, dots]
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {shapeList.map((shape) => (
        <Shape
          key={shape.id}
          shape={shape}
          squareColor={squareColor}
          circleColor={circleColor}
          dotColor={dotColor}
        />
      ))}
    </div>
  );
}

/**
 * Shape — renders one square, circle, or dot and drives its own drift
 * animation. Split out from the main component so each shape's Framer
 * Motion props stay readable instead of being built dynamically inline
 * inside a .map().
 */
function Shape({ shape, squareColor, circleColor, dotColor }) {
  const { type, top, left, duration, delay, driftX, driftY, rotate } = shape;

  // Shared drift: every shape type moves along the same small x/y path so
  // the whole layer feels like one coherent field rather than three
  // differently-behaving animation styles. `repeatType: "mirror"` makes it
  // glide back and forth smoothly instead of snapping back to start.
  const drift = {
    x: [0, driftX, 0],
    y: [0, driftY, 0],
  };
  const transition = {
    duration,
    delay,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };

  if (type === "square") {
    return (
      <motion.span
        style={{ top, left }}
        className={`absolute h-10 w-10 rounded-lg border backdrop-blur-sm ${squareColor}`}
        animate={{ ...drift, rotate: [0, rotate, 0] }}
        transition={transition}
      />
    );
  }

  if (type === "circle") {
    return (
      <motion.span
        style={{ top, left }}
        className={`absolute h-16 w-16 rounded-full border backdrop-blur-sm ${circleColor}`}
        animate={drift}
        transition={transition}
      />
    );
  }

  // "dot" — small glowing point. Glow comes from a soft box-shadow rather
  // than a blur filter, since a blurred 2px dot would just disappear.
  return (
    <motion.span
      style={{
        top,
        left,
        boxShadow: "0 0 8px 2px currentColor",
      }}
      className={`absolute h-1.5 w-1.5 rounded-full opacity-70 ${dotColor}`}
      animate={{ ...drift, opacity: [0.4, 0.9, 0.4] }}
      transition={transition}
    />
  );
}
