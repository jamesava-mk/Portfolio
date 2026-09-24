import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    label: "HOME",
    short: "H",
    path: "/",
    width: 72,
  },
  {
    label: "WORK",
    short: "W",
    path: "/work",
    width: 68,
  },
  {
    label: "JOURNEY",
    short: "J",
    path: "/journey",
    width: 88,
  },
  {
    label: "CONTACT",
    short: "C",
    path: "/contact",
    width: 82,
  },
];

const boxType = "font-['Space_Grotesk',sans-serif]";

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    if (path === "/work") {
      return (
        location.pathname === "/work" ||
        location.pathname.startsWith("/work/")
      );
    }

    return location.pathname === path;
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <nav
        className={`${boxType} mx-auto flex h-14 max-w-[1500px] items-center justify-between border border-white/[0.09] bg-[#08090b]/75 px-4 backdrop-blur-xl sm:px-5`}
      >
        {/* Secret admin gateway */}
        <Link
          to="/admin/dashboard"
          onClick={closeMenu}
          aria-label="James"
          title="James"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-white/20 text-[11px] font-semibold tracking-[-0.06em] text-white/85 transition-all duration-300 group-hover:border-white/45 group-hover:bg-white group-hover:text-black">
            J
          </span>

          <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 transition-colors duration-300 group-hover:text-white sm:block">
            James
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item, index) => {
            const active = isActive(item.path);
            const isHovered = hovered === index;

            return (
              <motion.div
                key={item.path}
                initial={false}
                animate={{
                  width: isHovered ? item.width : 38,
                }}
                transition={{
                  duration: 0.32,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onHoverStart={() => setHovered(index)}
                onHoverEnd={() => setHovered(null)}
                className="relative h-9"
              >
                <Link
                  to={item.path}
                  aria-label={item.label}
                  className={`relative flex h-full w-full items-center justify-center overflow-hidden border transition-colors duration-300 ${
                    active
                      ? "border-white/20 bg-white/[0.07] text-white"
                      : "border-white/[0.08] text-white/55 hover:border-white/20 hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  {/* Letter */}
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isHovered ? 0 : 1,
                      scale: isHovered ? 0.82 : 1,
                      x: isHovered ? -8 : 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-0 flex h-full w-[38px] items-center justify-center text-[11px] font-bold tracking-[-0.03em]"
                  >
                    {item.short}
                  </motion.span>

                  {/* Expanded label */}
                  <motion.span
                    initial={false}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      x: isHovered ? 0 : 9,
                    }}
                    transition={{
                      duration: 0.22,
                      delay: isHovered ? 0.04 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em]"
                  >
                    {item.label}
                  </motion.span>

                  {/* Active line */}
                  {active && (
                    <motion.span
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-2 right-2 h-px bg-white/75"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center md:flex">
          <Link
            to="/contact"
            className="group flex h-9 items-center gap-2 border border-white/[0.09] px-3 text-[8px] font-medium uppercase tracking-[0.18em] text-white/40 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.035] hover:text-white"
          >
            <span>Let's talk</span>

            <ArrowUpRight
              size={12}
              strokeWidth={1.3}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center border border-white/[0.09] text-white/55 transition hover:border-white/25 hover:text-white md:hidden"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-2 max-w-[1500px] border border-white/[0.09] bg-[#08090b]/95 p-3 backdrop-blur-xl md:hidden"
          >
            <div className="border border-white/[0.05]">
              {navigation.map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center justify-between border-b border-white/[0.05] px-4 py-5 last:border-b-0 ${
                      active ? "text-white" : "text-white/45"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex h-7 w-7 items-center justify-center border border-white/10 text-[10px] font-bold tracking-[0.08em] text-white/40">
                        {item.short}
                      </span>

                      <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                        {item.label}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={14}
                      className={
                        active ? "text-white/60" : "text-white/20"
                      }
                    />
                  </Link>
                );
              })}

              <Link
                to="/contact"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-between bg-white px-4 py-4 text-black"
              >
                <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
                  Start a conversation
                </span>

                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-3 flex items-center justify-between px-1 py-1 text-[8px] font-medium uppercase tracking-[0.18em] text-white/25">
              <span>J / 2026</span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Building
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}