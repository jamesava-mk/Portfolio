import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const intents = [
  {
    id: 'business',
    number: '01',
    label: 'I HAVE A BUSINESS',
    title: 'Something needs building.',
    description:
      'You have a business, service or existing idea that could use a better digital presence.',
    subject: 'Website / Business project',
    message:
      'Hi James,\n\nI have a business and I would like to discuss a website or digital project.\n\nHere is what I am working with:\n',
  },
  {
    id: 'idea',
    number: '02',
    label: 'I HAVE AN IDEA',
    title: 'I want to build something.',
    description:
      'You have an idea you want to explore, test or turn into something people can actually use.',
    subject: 'Product / Idea',
    message:
      'Hi James,\n\nI have an idea I would like to talk through and possibly build.\n\nThe idea is:\n',
  },
  {
    id: 'talk',
    number: '03',
    label: 'I JUST WANT TO TALK',
    title: "Let's talk.",
    description:
      'No formal project. You found something interesting, have a question, or simply want to connect.',
    subject: 'Hello James',
    message:
      'Hi James,\n\nI came across your work and wanted to say hello.\n\n',
  },
];

const EMAIL = 'avalumunmk2007@gmail.com';

export default function Contact() {
  const [activeIntent, setActiveIntent] = useState('business');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const current = useMemo(
    () =>
      intents.find((intent) => intent.id === activeIntent) ||
      intents[0],
    [activeIntent],
  );

  const buildMailto = () => {
    const body = [
      current.message,
      '',
      name ? `Name: ${name}` : '',
      email ? `Email: ${email}` : '',
      '',
      message,
    ]
      .filter((line, index, array) => {
        if (line !== '') return true;

        return (
          index > 0 &&
          index < array.length - 1 &&
          array[index - 1] !== '' &&
          array[index + 1] !== ''
        );
      })
      .join('\n');

    return `mailto:${EMAIL}?subject=${encodeURIComponent(
      current.subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#08090a] text-[#f2f0eb]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[58%] top-[8%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
            maskImage:
              'radial-gradient(circle at 55% 20%, black, transparent 70%)',
            WebkitMaskImage:
              'radial-gradient(circle at 55% 20%, black, transparent 70%)',
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-24 lg:pt-40">
          <div className="grid gap-12 lg:grid-cols-[.28fr_1fr]">
            <div className="flex items-start gap-3 text-[9px] uppercase tracking-[0.28em] text-white/30">
              <span>01</span>
              <span className="mt-[5px] h-px w-7 bg-white/15" />
              <span>Contact</span>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                  <p className="mb-6 flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/35">
                  <Sparkles size={11} strokeWidth={1.2} />
                  You made it here
                </p>

                <h1 className="max-w-6xl text-[clamp(3.7rem,9vw,9.5rem)] font-medium leading-[0.8] tracking-[-0.08em]">
                  SO,
                  <br />
                  WHAT ARE
                  <br />
                  WE BUILDING?
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
              >
                <p className="max-w-xl text-base leading-8 text-white/40 sm:text-lg">
                  You do not need a perfectly formed brief.
                  <br />
                  Just tell me what is on your mind.
                </p>

                <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.22em] text-white/20">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/50" />
                  Usually replies by email
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        <section className="grid lg:grid-cols-[.28fr_1fr]">
          <div className="hidden border-r border-white/10 lg:block" />

          <div className="lg:pl-16">
            {/* INTENT */}
            <section className="py-14 sm:py-20">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                    02 / Start somewhere
                  </p>

                  <p className="mt-2 text-sm text-white/35">
                    Pick the option that feels closest.
                  </p>
                </div>

                <span className="text-[8px] uppercase tracking-[0.2em] text-white/15">
                  No wrong answer
                </span>
              </div>

              <div className="mt-8 grid border-t border-white/10 sm:grid-cols-3">
                {intents.map((intent) => {
                  const active =
                    activeIntent === intent.id;

                  return (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() =>
                        setActiveIntent(intent.id)
                      }
                      className={`group relative min-h-[190px] border-b border-white/10 px-5 py-6 text-left transition sm:border-b-0 sm:border-r sm:last:border-r-0 sm:px-6 sm:py-8 ${
                        active
                          ? 'bg-white/[0.035]'
                          : 'hover:bg-white/[0.018]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="contact-intent"
                          className="absolute left-0 top-0 h-full w-px bg-white"
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      )}

                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] tracking-[0.2em] transition-colors ${
                            active
                              ? 'text-white'
                              : 'text-white/25'
                          }`}
                        >
                          {intent.number}
                        </span>

                        <ArrowRight
                          size={13}
                          className={`transition-all duration-300 ${
                            active
                              ? 'translate-x-0 text-white'
                              : '-translate-x-1 text-white/15 group-hover:translate-x-0 group-hover:text-white/50'
                          }`}
                        />
                      </div>

                      <p
                        className={`mt-8 text-[10px] uppercase tracking-[0.16em] ${
                          active
                            ? 'text-white'
                            : 'text-white/35'
                        }`}
                      >
                        {intent.label}
                      </p>

                      <p className="mt-3 max-w-[250px] text-xs leading-6 text-white/30">
                        {intent.description}
                      </p>

                      <div
                        className={`mt-5 h-px origin-left transition-all duration-500 ${
                          active
                            ? 'w-10 bg-white/30'
                            : 'w-0 bg-white/20 group-hover:w-6'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </section>

            {/* MESSAGE */}
            <section className="py-16 sm:py-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIntent}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -15,
                  }}
                  transition={{
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
                    {/* LEFT */}
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                        03 / Tell me about it
                      </p>

                      <h2 className="mt-6 max-w-md text-[clamp(2.5rem,4vw,4.4rem)] leading-[0.95] tracking-[-0.06em]">
                        {current.title}
                      </h2>

                      <p className="mt-6 max-w-sm text-sm leading-7 text-white/35">
                        {current.description}
                      </p>

                      <div className="mt-10 border-t border-white/[0.07] pt-5">
                        <p className="mb-4 text-[8px] uppercase tracking-[0.24em] text-white/20">
                          Prefer email?
                        </p>

                        <div className="flex flex-col gap-3">
                          <a
                            href={`mailto:${EMAIL}`}
                            className="group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.17em] text-white/50 transition hover:text-white"
                          >
                            <Mail
                              size={13}
                              strokeWidth={1.3}
                            />
                            {EMAIL}
                            <ArrowUpRight
                              size={11}
                              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </a>

                          <button
                            type="button"
                            onClick={copyEmail}
                            className="group flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-white/25 transition hover:text-white/60"
                          >
                            {copied ? (
                              <Check size={12} />
                            ) : (
                              <Copy size={12} />
                            )}

                            {copied
                              ? 'Email copied'
                              : 'Copy email'}
                          </button>
                        </div>
                      </div>

                      <div className="mt-10 flex items-start gap-3 text-[9px] leading-5 text-white/20">
                        <MessageCircle
                          size={13}
                          strokeWidth={1.2}
                          className="mt-0.5 shrink-0"
                        />

                        <span>
                          No formal proposal needed.
                          <br />
                          A rough idea is enough to start.
                        </span>
                      </div>
                    </div>

                    {/* FORM */}
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        window.location.href =
                          buildMailto();
                      }}
                      className="space-y-9"
                    >
                      <div className="grid gap-8 sm:grid-cols-2">
                        <label className="block">
                          <span className="text-[8px] uppercase tracking-[0.22em] text-white/25">
                            Your name
                          </span>

                          <input
                            type="text"
                            value={name}
                            onChange={(event) =>
                              setName(
                                event.target.value,
                              )
                            }
                            placeholder="What should I call you?"
                            autoComplete="name"
                            className="mt-3 w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/45"
                          />
                        </label>

                        <label className="block">
                          <span className="text-[8px] uppercase tracking-[0.22em] text-white/25">
                            Email
                          </span>

                          <input
                            type="email"
                            value={email}
                            onChange={(event) =>
                              setEmail(
                                event.target.value,
                              )
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="mt-3 w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/45"
                          />
                        </label>
                      </div>

                      <label className="block">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] uppercase tracking-[0.22em] text-white/25">
                            What&apos;s going on?
                          </span>

                          <span className="text-[8px] text-white/15">
                            {message.length > 0
                              ? `${message.length}`
                              : 'optional'}
                          </span>
                        </div>

                        <textarea
                          value={message}
                          onChange={(event) =>
                            setMessage(
                              event.target.value,
                            )
                          }
                          placeholder={
                            activeIntent === 'business'
                              ? 'Tell me about the business, what is not working, or what you want to build.'
                              : activeIntent === 'idea'
                                ? 'What is the idea? It can be rough.'
                                : 'Say hello. Ask something. Tell me what you found interesting.'
                          }
                          rows={7}
                          className="mt-3 w-full resize-none border-b border-white/15 bg-transparent py-3 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-white/45"
                        />
                      </label>

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="max-w-xs text-[9px] leading-5 text-white/20">
                          This opens your email app with
                          everything filled in. Nothing gets
                          stored on this website.
                        </p>

                        <button
                          type="submit"
                          className="group inline-flex w-fit items-center gap-4 border border-white/15 px-6 py-4 text-[9px] uppercase tracking-[0.22em] text-white/60 transition hover:border-white/40 hover:bg-white/[0.035] hover:text-white"
                        >
                          Start the conversation

                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </AnimatePresence>
            </section>
          </div>
        </section>

        {/* ELSEWHERE */}
        <section className="py-20 sm:py-28 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[.28fr_1fr]">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                04 / Elsewhere
              </p>

              <p className="mt-3 max-w-[180px] text-xs leading-5 text-white/25">
                If you want to see more of what I&apos;m
                doing before reaching out.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <a
                href="https://github.com/jamesava-mk"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden border border-white/10 p-6 transition duration-500 hover:border-white/25 hover:bg-white/[0.02]"
              >
                <div className="absolute right-0 top-0 h-px w-0 bg-white/50 transition-all duration-500 group-hover:w-20" />

                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    GitHub
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="text-white/25 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>

                <p className="mt-10 text-2xl tracking-[-0.04em]">
                  See the code.
                </p>

                <p className="mt-2 text-xs text-white/25">
                  Projects, experiments and things I&apos;m
                  figuring out.
                </p>
              </a>

              <a
                href="https://www.linkedin.com/in/mkegh-avalumun-77aa9b384"
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden border border-white/10 p-6 transition duration-500 hover:border-white/25 hover:bg-white/[0.02]"
              >
                <div className="absolute right-0 top-0 h-px w-0 bg-white/50 transition-all duration-500 group-hover:w-20" />

                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    LinkedIn
                  </span>

                  <ArrowUpRight
                    size={14}
                    className="text-white/25 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  />
                </div>

                <p className="mt-10 text-2xl tracking-[-0.04em]">
                  Find me there.
                </p>

                <p className="mt-2 text-xs text-white/25">
                  A little more of the professional side.
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FINAL LINE */}
      <section className="relative px-5 py-24 sm:py-32 md:px-8">
        <div className="mx-auto max-w-[1100px]">
          <p className="mb-5 text-[9px] uppercase tracking-[0.3em] text-white/20">
            05 / That&apos;s it
          </p>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-4xl text-[clamp(2.7rem,6vw,6rem)] font-light leading-[0.92] tracking-[-0.06em]">
              Good ideas usually start
              <span className="text-white/25">
                {' '}
                with a conversation.
              </span>
            </h2>

            <a
              href={`mailto:${EMAIL}`}
              className="group flex w-fit shrink-0 items-center gap-3 border-b border-white/15 pb-2 text-[9px] uppercase tracking-[0.25em] text-white/45 transition hover:border-white/40 hover:text-white"
            >
              Email me
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}