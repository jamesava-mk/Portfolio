import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ---------------------------------------------------------------------------
// Variant styles — kept as a lookup object outside the component so adding
// a new variant later is a one-line addition here, not a change to the
// component's logic or JSX structure.
// ---------------------------------------------------------------------------
const VARIANT_STYLES = {
  primary:
    "bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10",
  secondary:
    "bg-white/10 text-white hover:bg-white/15 border border-white/10",
  outline:
    "bg-transparent text-white border border-white/25 hover:border-white/50 hover:bg-white/5",
};

const SIZE_STYLES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

// How far the button is allowed to shift toward the cursor, in pixels.
// Capped deliberately low — a "magnetic" effect should feel like a subtle
// pull, not a button that visibly chases the mouse across the screen.
const MAGNETIC_STRENGTH = 0.35;
const MAGNETIC_MAX_OFFSET = 14;

/**
 * Button
 *
 * A single reusable button for the whole site: three visual variants,
 * a hover scale/opacity animation, and an optional "magnetic" effect
 * where the button subtly shifts toward the cursor as it approaches,
 * then eases back to rest on mouse leave.
 *
 * Renders as a native <button> by default, or as an <a> when `href` is
 * provided — so the same component covers both actions ("Submit") and
 * navigation ("View Projects") without the caller needing two components.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  magnetic = true,
  icon: Icon,
  iconPosition = "right",
  className = "",
  disabled = false,
  type = "button",
  ...rest // forwarded to the underlying element — onClick, target, aria-*, etc.
}) {
  const ref = useRef(null);

  // Raw cursor offset, smoothed into a spring so the button glides toward/
  // away from the cursor instead of snapping. Same pattern as the parallax
  // effect used elsewhere in this project, applied at a much smaller scale.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handlePointerMove = useCallback(
    (e) => {
      if (!magnetic || disabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Offset of the cursor from the button's own center, scaled down by
      // MAGNETIC_STRENGTH so the button moves a fraction of the distance
      // the cursor has moved — a full 1:1 follow would feel like dragging,
      // not magnetism.
      const relX = (e.clientX - rect.left - rect.width / 2) * MAGNETIC_STRENGTH;
      const relY = (e.clientY - rect.top - rect.height / 2) * MAGNETIC_STRENGTH;

      // Clamp so the pull has a hard ceiling regardless of button size or
      // how far into it the cursor moves — keeps the effect "magnetic"
      // rather than "the button is glued to your cursor."
      x.set(Math.max(-MAGNETIC_MAX_OFFSET, Math.min(MAGNETIC_MAX_OFFSET, relX)));
      y.set(Math.max(-MAGNETIC_MAX_OFFSET, Math.min(MAGNETIC_MAX_OFFSET, relY)));
    },
    [magnetic, disabled, x, y]
  );

  const handlePointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Element type is chosen at render time: a real <a> for navigation (so
  // it's keyboard/right-click/"open in new tab"-friendly) or a real
  // <button> for actions — never a <div> pretending to be either.
  const Element = href ? motion.a : motion.button;

  const combinedClassName = `
    inline-flex items-center justify-center gap-2 rounded-full font-medium
    transition-colors duration-200 select-none
    disabled:opacity-40 disabled:pointer-events-none
    ${VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary}
    ${SIZE_STYLES[size] ?? SIZE_STYLES.md}
    ${className}
  `.trim();

  return (
    <Element
      ref={ref}
      href={href}
      type={href ? undefined : type}
      disabled={!href ? disabled : undefined}
      aria-disabled={disabled || undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      // Hover/tap animation is layered independently of the magnetic
      // x/y spring — `whileHover`/`whileTap` animate `scale`, while the
      // magnetic effect animates `x`/`y` via the springs above. Framer
      // Motion merges both onto the same element without conflict.
      whileHover={!disabled ? { scale: 1.04 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={combinedClassName}
      {...rest}
    >
      {Icon && iconPosition === "left" && <Icon size={16} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={16} />}
    </Element>
  );
}
