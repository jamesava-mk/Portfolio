import { Suspense, lazy, useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import ScrollProgress from './components/ui/ScrollProgress';
import ScrollToTop from './components/ui/ScrollToTop';
import Loader from './components/ui/Loader';

const Projects = lazy(() => import('./components/projects/Projects'));
const Experience = lazy(() => import('./components/experience/Experience'));
const Contact = lazy(() => import('./components/contact/Contact'));
const Footer = lazy(() => import('./components/layout/footer'));

const sectionFallback = <div className="h-24" aria-hidden="true" />;

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[140] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-950">
        Skip to content
      </a>
      <Loader isLoading={isLoading} onFinish={() => setIsLoading(false)} />
      <Navbar />
      <ScrollProgress />
      <ScrollToTop />
      <main id="main-content" tabIndex="-1">
        <Hero />
        <About />
        <Skills />
        <Suspense fallback={sectionFallback}>
          <Projects />
        </Suspense>
        <Suspense fallback={sectionFallback}>
          <Experience />
        </Suspense>
        <Suspense fallback={sectionFallback}>
          <Contact />
        </Suspense>
        <Suspense fallback={sectionFallback}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}

export default App;
