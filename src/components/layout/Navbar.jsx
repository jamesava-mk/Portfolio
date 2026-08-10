import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigationItems, siteBrand } from "../../data/navigation";
import { socialLinks } from "../../data/socials";

// Pixel threshold after which the navbar switches from transparent to the
// "scrolled" glass state. Pulled out as a constant so it's easy to tune.
const SCROLL_THRESHOLD = 24;

/**
 * Navbar
 *
 * A sticky, glassmorphism site navigation bar.
 *
 * - Transparent + unblurred at the top of the page.
 * - Gains a dark, blurred glass background once the user scrolls past
 *   SCROLL_THRESHOLD, with an animated transition between states.
 * - Centered nav links with a sliding active-link indicator.
 * - Right-aligned social icons.
 * - Fully accessible mobile hamburger menu.
 *
 * Self-contained: manages its own scroll listener, active-section tracking,
 * and mobile menu state. Drop it at the top of any page — no props required
 * — but NAV_LINKS / SOCIAL_LINKS above can be swapped for props if the
 * component needs to be reused across projects with different content.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navigationItems[0]?.href ?? '#about');
  const [hoveredHref, setHoveredHref] = useState(null);

  // ---------------------------------------------------------------------
  // Scroll handling: toggles the glass background and (roughly) tracks
  // which section is currently in view so the active indicator follows
  // real scroll position, not just clicks.
  // ---------------------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

      // Determine active section by finding the last section whose top
      // has scrolled above the middle of the viewport. This is a cheap,
      // dependency-free alternative to IntersectionObserver that works
      // fine for a handful of top-level sections like these.
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = navigationItems[0]?.href ?? '#about';

      for (const link of navigationItems) {
        const section = document.querySelector(link.href);
        if (section && section.offsetTop <= scrollPosition) {
          current = link.href;
        }
      }
      setActiveHref(current);
    };

    handleScroll(); // set correct initial state on mount (e.g. deep link/refresh)
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scroll to a section and close the mobile menu on navigation.
  // useCallback so the handler identity is stable across re-renders when
  // passed down to mapped children.
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navbarOffset = 80;
      const targetPosition = 
      target.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    setIsMobileOpen(false);
    setActiveHref(href);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  } else {
    console.warn(`Navigation target not found: "${href}"`);
    setisMobileOpen(false);
  }
  }, []);

  return (
    <motion.header
      // Entrance animation: nav drops in from above on initial mount.
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50"
    >
      {/*
        Glass background layer is separate from the content layer so we can
        animate background/blur/border independently without affecting the
        layout of the logo/links/icons above it.
      */}
      <motion.div
        animate={{
          backgroundColor: isScrolled
            ? "rgba(5, 7, 12, 0.78)"
            : "rgba(5, 7, 12, 0.35)",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(4px)",
          borderBottomColor: isScrolled
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(4px)" }}
        className="rounded-2xl border border-white/0 shadow-lg shadow-black/10 overflow-hidden"
      >
        <nav className="mx-auto px-5 lg:px-6">
          <div className="flex h-14 items-center justify-between lg:grid lg:grid-cols-3">
            {/* ---------------- Logo (left) ---------------- */}
            <a
                href="#home"
                onClick={(e) => handleNavClick(e, "#home")}
                className="
                shrink-0
                text-sm
                font-semibold
                tracking-[0.15em]
                text-white
  "
>
  {siteBrand}
</a>

            {/* ---------------- Desktop links (center) ---------------- */}
            <ul className="hidden lg:flex items-center justify-center gap-6">
              {navigationItems.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <li key={link.href} className="relative">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      onMouseEnter={() => setHoveredHref(link.href)}
                      onMouseLeave={() => setHoveredHref(null)}
                      className={`relative whitespace-nowrap py-2 text-[13px] font-medium tracking-wide transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {/*
                        Active indicator: a layoutId lets Framer Motion
                        automatically animate this element sliding between
                        links whenever `isActive` moves to a new <li>,
                        instead of us hand-coding position math.
                      */}
                      {hoveredHref == link.href && (
                        <motion.span
                          layoutId="nav-active-indicator"
                          className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.7)]"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* ---------------- Social icons (right) + mobile trigger ---------------- */}
            <div className="flex items-center justify-end gap-2">
              <div className="hidden lg:flex items-center gap-1">
                {socialLinks.filter((item) => item.href).map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </a>
                ))}
              </div>

              {/* Hamburger — mobile only */}
              <button
                type="button"
                onClick={() => setIsMobileOpen((prev) => !prev)}
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
                className="lg:hidden p-2 -mr-2 rounded-md text-white hover:bg-white/10 transition-colors"
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* ---------------- Mobile menu overlay ---------------- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[rgba(5,7,12,0.96)] backdrop-blur-xl border-b border-white/10"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {navigationItems.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block py-3 text-sm font-medium transition-colors ${
                      activeHref === link.href
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social icons repeated inside the mobile drawer so they're
                reachable without needing the (hidden) desktop row. */}
            <div className="flex items-center gap-2 px-6 pb-6 pt-2 border-t border-white/10">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon size={20} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
