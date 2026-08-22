import React, { useState, useEffect } from 'react';
import VideoLoader from './components/VideoLoader';
import AnimatedContent from './components/AnimatedContent';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import {
  Search,
  PenTool,
  Layout,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Check,
  Menu,
  X,
  Sparkles,
  Globe,
  Users,
  Compass,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Star,
  Trophy,
  Target,
  Linkedin
} from 'lucide-react';

export default function App() {
  // Video Intro / Loader state (transitions after 9 seconds)
  const [isLoading, setIsLoading] = useState(true);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Header background opacity on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Contact form submission state
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Construct mailto link with user filled details
      const recipient = 'sirigirianusha9@gmail.com';
      const emailSubject = encodeURIComponent(formState.subject || `Inquiry from ${formState.name}`);
      const emailBody = encodeURIComponent(
        `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`
      );

      // Redirect user to their default mail client
      window.location.href = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 600);
  };

  // Scroll to section helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-alabaster text-forest font-sans overflow-x-hidden">

      {/* Initial Video Intro Loader (9s with smooth transition) */}
      {isLoading && <VideoLoader onComplete={() => setIsLoading(false)} />}

      {/* 1. MANDATORY PAPER GRAIN TEXTURE OVERLAY */}
      <div
        className="pointer-events-none fixed inset-0 z-[100] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Floating Success Toast */}
      {isSubmitted && (
        <div className="fixed bottom-8 right-8 z-[90] flex items-center gap-3 bg-forest text-alabaster px-6 py-4 rounded-full shadow-soft-xl border border-stoneBorder animate-bounce duration-500">
          <Check className="w-5 h-5 text-sage" strokeWidth={2} />
          <span className="font-sans text-sm tracking-wider uppercase font-semibold">Message Sent Successfully!</span>
        </div>
      )}

      {/* 2. NAVIGATION BAR */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-6 px-6 md:px-12 ${isScrolled ? 'bg-alabaster/90 backdrop-blur-md border-b border-stoneBorder py-4 shadow-soft-sm' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-serif text-2xl font-bold tracking-tight text-forest hover:opacity-80 transition-opacity"
          >
            Anusha <span className="italic font-normal text-sage">S.</span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {['About', 'Impact', 'Experience', 'Projects', 'Skills', 'Education'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm font-sans tracking-widest uppercase hover:text-terracotta transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-terracotta transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2.5 rounded-full border border-forest text-forest text-sm uppercase tracking-widest font-medium hover:bg-forest hover:text-alabaster transition-all duration-500 ease-out"
            >
              Get In Touch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 hover:text-sage transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`fixed inset-0 z-50 bg-forest/20 backdrop-blur-sm transition-opacity duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} onClick={() => setMobileMenuOpen(false)}>
        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-screen bg-alabaster p-8 flex flex-col justify-between shadow-soft-xl transition-transform duration-500 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-2xl font-bold text-forest">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:text-terracotta transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex flex-col gap-8 my-auto">
            {['About', 'Impact', 'Experience', 'Projects', 'Skills', 'Education'].map((item, idx) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left font-serif text-3xl font-semibold text-forest hover:text-terracotta transition-colors"
                style={{ transitionDelay: `${idx * 75}ms` }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6 border-t border-stoneBorder pt-6">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-center py-3 bg-forest text-alabaster rounded-full text-sm uppercase tracking-widest hover:bg-terracotta transition-colors duration-300"
            >
              Get In Touch
            </button>
            <div className="text-center text-xs text-sage tracking-wider">
              sirigirianusha9@gmail.com
            </div>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <header className="relative pt-32 pb-24 md:pt-35 md:pb-30 px-6 md:px-12 overflow-hidden">
        {/* Background botanical leaf illustration */}
        <div className="absolute top-1/4 right-0 w-64 h-64 opacity-5 pointer-events-none transform translate-x-12 select-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full text-forest">
            <path d="M12 2C6.5 2 2 6.5 2 12c0 4 2.5 7.5 6 9v-3c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6v3c3.5-1.5 6-5 6-9 0-5.5-4.5-10-10-10z" strokeWidth={1} />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <AnimatedContent distance={80} direction="vertical" duration={0.9} delay={0.1}>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-sage" />
                <span className="text-sm font-sans tracking-widest uppercase text-sage font-medium">Digital Marketing Manager | SEO | Performance Marketing | Local SEO | Content Strategy</span>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={90} direction="vertical" duration={1.0} delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-forest leading-[1.08] tracking-tight mb-8">
                Growing traffic <span className="italic font-normal text-terracotta">organically</span> <br /><span className="whitespace-nowrap">
                  through strategy.</span>
              </h1>
            </AnimatedContent>

            <AnimatedContent distance={80} direction="vertical" duration={0.9} delay={0.3}>
              <p className="text-lg md:text-xl text-forest/80 font-sans leading-relaxed max-w-xl mb-10">
                Anusha Sirigiri is a results-driven digital specialist based in Hyderabad.
                She craft SEO-friendly campaigns, refines content models, and engineers modern search visibility
                to drive user-centered, sustainable growth.
              </p>
            </AnimatedContent>

            <AnimatedContent distance={70} direction="vertical" duration={0.8} delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('impact')}
                  className="h-14 px-8 bg-forest hover:bg-terracotta text-alabaster text-sm uppercase tracking-widest font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-soft-md hover:shadow-soft-lg transform hover:-translate-y-0.5"
                >
                  <span>Explore Work</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="h-14 px-8 border border-sage hover:border-terracotta text-forest hover:text-terracotta text-sm uppercase tracking-widest font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <span>Get In Touch</span>
                </button>
              </div>
            </AnimatedContent>
          </div>

          {/* Right Image/Arch Column */}
          <div className="lg:col-span-5 relative flex justify-center mt-8 lg:mt-0">
            <AnimatedContent distance={100} direction="vertical" duration={1.1} delay={0.3} scale={0.95} className="w-full flex justify-center">
              {/* Roman Arch Outer Container */}
              <div className="relative w-full max-w-sm aspect-[3/4] md:aspect-square lg:aspect-[3/4] rounded-t-full overflow-visible group">

                {/* Arch Frame (Background shadow card) */}
                <div className="absolute inset-0 bg-clay rounded-t-[200px] transform translate-x-3 translate-y-3 opacity-30 transition-transform duration-700 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />

                {/* Main Portrait Image Container */}
                <div className="absolute inset-0 rounded-t-[200px] rounded-b-[40px] overflow-hidden border border-stoneBorder bg-clay/20 shadow-soft-xl">
                  <img
                    src="/main.jpeg"
                    alt="Anusha Sirigiri"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/portrait.png";
                    }}
                    className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-[1000ms] ease-out"
                  />
                </div>

                {/* Floating Quote Overlap Card */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-alabaster/80 backdrop-blur-md border border-stoneBorder/60 p-5 rounded-3xl shadow-soft-lg text-center transform transition-transform duration-500 hover:scale-[1.02]">
                  <p className="font-serif italic text-forest text-sm md:text-base leading-relaxed">
                    "In nature, growth is organic. <br className="hidden md:inline" /> In search, we make it inevitable."
                  </p>
                  <div className="mt-2 text-xs font-sans tracking-widest uppercase text-sage">
                    Anusha Sirigiri
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>

        </div>
      </header>

      {/* Decorative separating element */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center">
        <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-stoneBorder to-transparent" />
      </div>

      {/* 3.5. IMPACT & ACHIEVEMENTS SECTION (SCROLL STACK) */}
      <section id="impact" className="pt-20 md:pt-28 pb-0 px-6 md:px-12 bg-[#F2F0EB]/40 border-y border-stoneBorder/40 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-6 md:mb-10">
            <AnimatedContent distance={60} direction="vertical" duration={0.8}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[1px] bg-sage" />
                <span className="text-sm font-sans tracking-widest uppercase text-sage font-medium">
                  Proven Track Record
                </span>
                <span className="w-8 h-[1px] bg-sage" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-forest leading-tight mb-4">
                Impact &amp; <span className="italic font-normal text-terracotta">Achievements</span>
              </h2>
              <p className="text-base md:text-lg text-forest/75 font-sans leading-relaxed">
                WhiteScholars — Growth & Achievements Key growth milestones and measurable results from my digital marketing journey at WhiteScholars.
              </p>
            </AnimatedContent>
          </div>

          {/* ScrollStack Component */}
          <ScrollStack
            itemDistance={75}
            itemScale={0.025}
            itemStackDistance={24}
            stackPosition="18%"
            scaleEndPosition="8%"
            baseScale={0.88}
            useWindowScroll={true}
            className="max-w-4xl mx-auto"
          >
            {/* Card 1 */}
            <ScrollStackItem itemClassName="bg-white border border-stoneBorder shadow-soft-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-semibold uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Keyword Dominance</span>
                  </div>
                  <span className="font-serif text-sm md:text-base text-sage font-semibold tracking-wider">
                    01 / 08
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
                      1st Position
                    </span>
                    <span className="text-xs md:text-sm font-sans px-2.5 py-0.5 rounded-md bg-terracotta/10 text-terracotta font-semibold">
                      #1 on Google SERP
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3">
                    1st Position — Data Analytics Course in Hyderabad
                  </h3>
                  <p className="text-sm md:text-base text-forest/80 font-sans leading-relaxed">
                    Moved the “Data Analytics Course in Hyderabad” keyword from the Top 10 to #1 position within 6 months through SEO, content optimization, local SEO and backlink strategies.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stoneBorder/60">
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Top 10 → #1 Position</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">6 Months Timeline</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Local SEO &amp; Backlinks</span>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 2 */}
            <ScrollStackItem itemClassName="bg-white border border-stoneBorder shadow-soft-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/15 border border-sage/30 text-forest text-xs font-semibold uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5 text-sage" />
                    <span>Search Expansion</span>
                  </div>
                  <span className="font-serif text-sm md:text-base text-sage font-semibold tracking-wider">
                    02 / 08
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
                      1.7K Organic Traffic
                    </span>
                    <span className="text-xs md:text-sm font-sans px-2.5 py-0.5 rounded-md bg-sage/15 text-forest font-semibold">
                      1600%+ Growth
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3">
                    1.7K Organic Traffic
                  </h3>
                  <p className="text-sm md:text-base text-forest/80 font-sans leading-relaxed">
                    Grew website organic traffic from approximately 100 to 1.7K within one year through keyword strategy, content optimization, technical SEO and continuous search performance improvements.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stoneBorder/60">
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">100 → 1.7K Monthly Visits</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">1 Year Trajectory</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Technical SEO &amp; Content</span>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 3 */}
            <ScrollStackItem itemClassName="bg-white border border-stoneBorder shadow-soft-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5 text-sage" />
                    <span>Domain Authority</span>
                  </div>
                  <span className="font-serif text-sm md:text-base text-sage font-semibold tracking-wider">
                    03 / 08
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
                      DR 9 → DR 27
                    </span>
                    <span className="text-xs md:text-sm font-sans px-2.5 py-0.5 rounded-md bg-forest/10 text-forest font-semibold">
                      3X Authority Surge
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3">
                    DR 9 → DR 27
                  </h3>
                  <p className="text-sm md:text-base text-forest/80 font-sans leading-relaxed">
                    Improved the website's Domain Rating from 9 to 27 through a focused backlink-building and off-page SEO strategy.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stoneBorder/60">
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">+200% Authority Growth</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">High-Quality Backlinks</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Off-Page SEO Strategy</span>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 4 */}
            <ScrollStackItem itemClassName="bg-white border border-stoneBorder shadow-soft-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-semibold uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5" />
                    <span>Social Proof &amp; Local Pack</span>
                  </div>
                  <span className="font-serif text-sm md:text-base text-sage font-semibold tracking-wider">
                    04 / 08
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
                      500+ Google Reviews
                    </span>
                    <span className="text-xs md:text-sm font-sans px-2.5 py-0.5 rounded-md bg-terracotta/10 text-terracotta font-semibold">
                      5X Review Growth
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3">
                    500+ Google Reviews
                  </h3>
                  <p className="text-sm md:text-base text-forest/80 font-sans leading-relaxed">
                    Helped grow the Google Business Profile from 100+ reviews to 500+ reviews, strengthening the brand's local search presence and online reputation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stoneBorder/60">
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">100+ → 500+ Reviews</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Google Business Profile</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Local Search Authority</span>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 5 */}
            <ScrollStackItem itemClassName="bg-white border border-stoneBorder shadow-soft-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage/15 border border-sage/30 text-forest text-xs font-semibold uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 text-terracotta fill-terracotta" />
                    <span>Reputation &amp; Trust</span>
                  </div>
                  <span className="font-serif text-sm md:text-base text-sage font-semibold tracking-wider">
                    05 / 08
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
                      4.7★ → 4.8★ Rating
                    </span>
                    <span className="text-xs md:text-sm font-sans px-2.5 py-0.5 rounded-md bg-sage/15 text-forest font-semibold">
                      High Customer Trust
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3">
                    4.7★ → 4.8★ Rating
                  </h3>
                  <p className="text-sm md:text-base text-forest/80 font-sans leading-relaxed">
                    Contributed to improving the Google Business Profile rating from 4.7 to 4.8 stars while maintaining a strong review acquisition and reputation strategy.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stoneBorder/60">
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">4.8 Star Sentiment</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Review Acquisition Strategy</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Brand Sentiment</span>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 6 */}
            <ScrollStackItem itemClassName="bg-white border border-stoneBorder shadow-soft-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5 text-forest" />
                    <span>Competitive Search</span>
                  </div>
                  <span className="font-serif text-sm md:text-base text-sage font-semibold tracking-wider">
                    06 / 08
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
                      Top 10 Rankings
                    </span>
                    <span className="text-xs md:text-sm font-sans px-2.5 py-0.5 rounded-md bg-forest/10 text-forest font-semibold">
                      Tech Keyword Cluster
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3">
                    Top 10 Rankings
                  </h3>
                  <p className="text-sm md:text-base text-forest/80 font-sans leading-relaxed">
                    Improved the search visibility of Data Science and Digital Marketing course-related keywords, achieving Top 10 rankings in a competitive Hyderabad market.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stoneBorder/60">
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Data Science &amp; Digital Marketing</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Competitive Market</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">SERP Visibility</span>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 7 */}
            <ScrollStackItem itemClassName="bg-white border border-stoneBorder shadow-soft-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-semibold uppercase tracking-wider">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Paid Search &amp; ROAS</span>
                  </div>
                  <span className="font-serif text-sm md:text-base text-sage font-semibold tracking-wider">
                    07 / 08
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
                      ₹60K → ₹1.2L
                    </span>
                    <span className="text-xs md:text-sm font-sans px-2.5 py-0.5 rounded-md bg-terracotta/10 text-terracotta font-semibold">
                      2X ROAS
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3">
                    ₹60K → ₹1.2L Through Google Ads
                  </h3>
                  <p className="text-sm md:text-base text-forest/80 font-sans leading-relaxed">
                    Started working on Google Ads campaigns with approximately ₹60,000 in ad spend and generated ₹1,20,000 in returns, delivering approximately 2X ROAS, based on tracked campaign results.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stoneBorder/60">
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">₹60K Ad Spend</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">₹1,20,000 Returns</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">2X ROAS Efficiency</span>
                </div>
              </div>
            </ScrollStackItem>

            {/* Card 8 */}
            <ScrollStackItem itemClassName="bg-white border border-stoneBorder shadow-soft-xl">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest text-alabaster text-xs font-semibold uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5 text-sage" />
                    <span>Leadership &amp; Scaling</span>
                  </div>
                  <span className="font-serif text-sm md:text-base text-sage font-semibold tracking-wider">
                    08 / 08
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
                      Solo → Team of 5
                    </span>
                    <span className="text-xs md:text-sm font-sans px-2.5 py-0.5 rounded-md bg-forest/10 text-forest font-semibold">
                      Leadership Growth
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3">
                    From Solo SEO to a Team of 5
                  </h3>
                  <p className="text-sm md:text-base text-forest/80 font-sans leading-relaxed">
                    Started at WhiteScholars as the sole SEO Analyst, managing the SEO function independently. As the digital marketing function grew, progressed into a leadership role and now work with a 5-member digital marketing team, including myself.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stoneBorder/60">
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">WhiteScholars SEO Lead</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">5-Member Marketing Team</span>
                  <span className="px-3 py-1 rounded-full bg-[#F2F0EB] text-forest/80 text-xs font-medium">Mentorship &amp; Management</span>
                </div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="pt-8 md:pt-10 pb-24 md:pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Title / Bio Column */}
            <div className="lg:col-span-5">
              <AnimatedContent distance={100} direction="horizontal" reverse={true} duration={0.9}>
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-8 h-[1px] bg-sage" />
                  <span className="text-sm font-sans tracking-widest uppercase text-sage font-medium">About Me</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-forest leading-tight mb-8">
                  Fusing analytical depth with <span className="italic font-normal text-terracotta">creative</span> strategy.
                </h2>
                <p className="text-base md:text-lg text-forest/80 font-sans leading-relaxed mb-6">
                  With a background in Commerce (B.Com) combined with technical training in Search Engine Optimization,
                  I bridge the gap between business objectives and search ranking algorithms. My approach is structured,
                  relying heavily on raw metrics, keyword analytics, and user engagement behaviors to build growth blueprints.
                </p>
                <p className="text-base md:text-lg text-forest/80 font-sans leading-relaxed mb-8">
                  Beyond keywords, I am deeply interested in web accessibility and clean visual design. I advocate for responsive
                  layouts and semantic layouts that provide users with a delightful browsing experience while ensuring robots
                  can parse indexing fields smoothly.
                </p>

                {/* NSS Volunteer Spotlight Card */}
                <div className="bg-clay/10 border border-stoneBorder rounded-3xl p-6 shadow-soft-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sage/5 rounded-full -translate-y-8 translate-x-8" />
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-alabaster rounded-2xl border border-stoneBorder flex-shrink-0 text-sage">
                      <Sparkles className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-forest font-semibold mb-2">Community & Social Engagement</h4>
                      <p className="text-sm text-forest/70 leading-relaxed">
                        Active volunteer at N.S.S. (National Service Scheme). Proudly participated in practice training sessions supporting women blind cricketers, fostering teamwork and inclusivity.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedContent>
            </div>

            {/* Strengths Staggered Cards Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <AnimatedContent distance={80} direction="horizontal" duration={0.8}>
                <h3 className="font-serif text-2xl text-forest mb-8 lg:mb-12 font-semibold">Core Strengths & Mindset</h3>
              </AnimatedContent>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Strength 1 */}
                <AnimatedContent distance={80} direction="horizontal" duration={0.8} delay={0.1}>
                  <div className="bg-white border border-stoneBorder rounded-3xl p-8 hover:-translate-y-2 hover:shadow-soft-md transition-all duration-500">
                    <div className="w-12 h-12 bg-forest text-alabaster rounded-full flex items-center justify-center mb-6">
                      <TrendingUp className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-forest mb-3">Analytical Mindset</h4>
                    <p className="text-sm text-forest/70 font-sans leading-relaxed">
                      Strong data-driven outlook with extreme attention to structural nuances. I read rankings through metric tracking, checking what converts and identifying organic pitfalls.
                    </p>
                  </div>
                </AnimatedContent>

                {/* Strength 2 */}
                <AnimatedContent distance={80} direction="horizontal" duration={0.8} delay={0.2}>
                  <div className="bg-white border border-stoneBorder rounded-3xl p-8 md:translate-y-6 hover:translate-y-4 hover:shadow-soft-md transition-all duration-500">
                    <div className="w-12 h-12 bg-sage text-alabaster rounded-full flex items-center justify-center mb-6">
                      <Users className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-forest mb-3">Exceptional Communication</h4>
                    <p className="text-sm text-forest/70 font-sans leading-relaxed">
                      Articulate writer and transparent team member. I work seamlessly with content creators, translation units, and engineering teams to align goals with search strategy.
                    </p>
                  </div>
                </AnimatedContent>

                {/* Strength 3 */}
                <AnimatedContent distance={80} direction="horizontal" duration={0.8} delay={0.3}>
                  <div className="bg-white border border-stoneBorder rounded-3xl p-8 hover:-translate-y-2 hover:shadow-soft-md transition-all duration-500">
                    <div className="w-12 h-12 bg-clay text-forest rounded-full flex items-center justify-center mb-6">
                      <Compass className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-forest mb-3">Quick & Adaptable</h4>
                    <p className="text-sm text-forest/70 font-sans leading-relaxed">
                      The SEO landscape shifts weekly. I enjoy staying ahead of core search engine algorithm updates, adapting copywriting angles, and mastering new digital audit instruments.
                    </p>
                  </div>
                </AnimatedContent>

                {/* Strength 4 */}
                <AnimatedContent distance={80} direction="horizontal" duration={0.8} delay={0.4}>
                  <div className="bg-white border border-stoneBorder rounded-3xl p-8 md:translate-y-6 hover:translate-y-4 hover:shadow-soft-md transition-all duration-500">
                    <div className="w-12 h-12 bg-terracotta text-alabaster rounded-full flex items-center justify-center mb-6">
                      <Globe className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-forest mb-3">User-Centered Focus</h4>
                    <p className="text-sm text-forest/70 font-sans leading-relaxed">
                      Search engine optimizations are only successful if the customer is satisfied. I advocate for responsive architecture, fast page indexing speed, and intuitive user paths.
                    </p>
                  </div>
                </AnimatedContent>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. WORK EXPERIENCE SECTION */}
      <section id="experience" className="py-24 md:py-20 bg-[#F2F0EB]/60 border-y border-stoneBorder/50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <AnimatedContent distance={80} direction="vertical" duration={0.9}>
            <div className="max-w-3xl mb-16 md:mb-24">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-sage" />
                <span className="text-sm font-sans tracking-widest uppercase text-sage font-medium">Professional Path</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-forest leading-tight mb-6">
                Core Expertise in <span className="italic font-normal text-terracotta">Oxygen Ites</span>
              </h2>
              <p className="text-base md:text-lg text-forest/75 font-sans">
                Currently working as a Digital Marketing (SEO Analyst) at Oxygen Ites Pvt Ltd (July 2024 - Present).
                My responsibility is divided into three key verticals: Search Engine Optimization, Content Strategy, and Responsive UX Layout Auditing.
              </p>
            </div>
          </AnimatedContent>

          {/* Staggered Grid of 3 Core Domains */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">

            {/* Domain 1: Search Engine Optimization */}
            <AnimatedContent distance={90} direction="vertical" duration={0.8} delay={0.1}>
              <div className="bg-white border border-stoneBorder rounded-3xl p-8 shadow-soft-sm hover:-translate-y-2 hover:shadow-soft-md transition-all duration-500">
                <div className="p-3 bg-alabaster rounded-2xl border border-stoneBorder text-forest inline-block mb-6">
                  <Search className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest mb-4">SEO & Audits</h3>
                <p className="text-xs font-sans tracking-widest uppercase text-sage mb-6 font-semibold">Technical Optimization</p>

                <ul className="space-y-4">
                  {[
                    "Conduct detailed keyword research to uncover high-intent search queries.",
                    "Optimize content hierarchy to increase organic traffic volumes.",
                    "Improve on-page elements by refining HTML meta-tags, headers, and media alt-texts.",
                    "Utilize SEMrush, Ahrefs, and Google Search Console to map out crawling bugs.",
                    "Build authoritative backlinks through organic outreach campaigns."
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-forest/80 leading-relaxed">
                      <Check className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>

            {/* Domain 2: Content Writing & Strategy */}
            <AnimatedContent distance={90} direction="vertical" duration={0.8} delay={0.25}>
              <div className="bg-white border border-stoneBorder rounded-3xl p-8 shadow-soft-sm hover:-translate-y-2 md:translate-y-12 hover:translate-y-10 hover:shadow-soft-md transition-all duration-500">
                <div className="p-3 bg-alabaster rounded-2xl border border-stoneBorder text-sage inline-block mb-6">
                  <PenTool className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest mb-4">Content Strategy</h3>
                <p className="text-xs font-sans tracking-widest uppercase text-sage mb-6 font-semibold">Copywriting & Collaboration</p>

                <ul className="space-y-4">
                  {[
                    "Draft high-quality, readable copy for blogs, site sections, and social campaigns.",
                    "Align article keywords with seasonal user queries and intent models.",
                    "Coordinate with writing staff and translators to implement content plans.",
                    "Investigate trending market directories to ideate content outlines.",
                    "Map out copy hierarchies that retain reader focus and reduce bounce rate."
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-forest/80 leading-relaxed">
                      <Check className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>

            {/* Domain 3: Web Designing & Development */}
            <AnimatedContent distance={90} direction="vertical" duration={0.8} delay={0.4}>
              <div className="bg-white border border-stoneBorder rounded-3xl p-8 shadow-soft-sm hover:-translate-y-2 hover:shadow-soft-md transition-all duration-500">
                <div className="p-3 bg-alabaster rounded-2xl border border-stoneBorder text-forest inline-block mb-6">
                  <Layout className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-forest mb-4">Web Design</h3>
                <p className="text-xs font-sans tracking-widest uppercase text-sage mb-6 font-semibold">UX Layout & Accessibility</p>

                <ul className="space-y-4">
                  {[
                    "Design search-friendly layout wireframes focusing on mobile response rates.",
                    "Ensure layouts are completely accessible, keeping contrast parameters balanced.",
                    "Configure fast, intuitive user pathways for enhanced conversion funnels.",
                    "Audit loading bottlenecks to maximize Largest Contentful Paint (LCP) performance.",
                    "Partner with developer cohorts to bring responsive prototypes to release."
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-forest/80 leading-relaxed">
                      <Check className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContent>

          </div>

          {/* Stagger spacer for layout */}
          <div className="hidden md:block h-16" />

        </div>
      </section>

      {/* 6. FEATURED PROJECT SECTION */}
      <section id="projects" className="py-24 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <AnimatedContent distance={100} direction="horizontal" reverse={true} duration={0.9}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-sage" />
                <span className="text-sm font-sans tracking-widest uppercase text-sage font-medium">Research Spotlight</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-forest leading-tight">
                Academic & Industry <span className="italic font-normal text-terracotta">Presentations</span>
              </h2>
            </div>
          </AnimatedContent>

          {/* Broad Editorial-style Project Card */}
          <AnimatedContent distance={120} direction="horizontal" duration={1.0} delay={0.2}>
            <div className="bg-white border border-stoneBorder rounded-[40px] overflow-hidden shadow-soft-lg grid grid-cols-1 lg:grid-cols-12 items-stretch hover:shadow-soft-xl transition-shadow duration-700">

              {/* Project Details */}
              <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-clay/30 text-forest text-xs uppercase tracking-widest font-semibold">
                      Market Research
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-forest text-alabaster text-xs uppercase tracking-widest font-semibold">
                      Conference Paper
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-forest mb-6 leading-tight">
                    Customer Satisfaction Toward Product Amul
                  </h3>

                  <p className="text-base text-forest/80 leading-relaxed mb-6 font-sans">
                    This research project investigates customer behaviors, purchasing criteria, and overall brand loyalty metrics
                    towards Amul's dairy product line. Through meticulous questionnaire collection, statistical feedback evaluation,
                    and demand mapping, the study identified critical retention signals in local distribution loops.
                  </p>

                  <p className="text-base text-forest/80 leading-relaxed mb-8 font-sans">
                    The findings highlight how distribution consistency, product freshness, and brand trust drive dairy purchasing choices.
                    This academic paper was selected for formal presentation at the prestigious international conference.
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-stoneBorder pt-8">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#F2F0EB] flex items-center justify-center text-sage">
                      <Award className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="font-serif text-sm font-bold text-forest">ICARD4 Conference Presentation</h5>
                      <p className="text-xs text-forest/60">Presented at the 4th International Conference on Advancement in Research & Development.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Aesthetic Visual Side Panel */}
              <div className="lg:col-span-5 bg-clay/20 p-8 md:p-12 flex flex-col justify-center items-center border-t lg:border-t-0 lg:border-l border-stoneBorder relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  {/* SVG decorative circles */}
                  <svg viewBox="0 0 100 100" className="w-full h-full text-forest">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                </div>

                <div className="relative text-center max-w-xs bg-alabaster/95 p-8 rounded-3xl shadow-soft-md border border-stoneBorder">
                  <div className="w-16 h-16 rounded-full bg-forest text-alabaster flex items-center justify-center mx-auto mb-6 shadow-soft-sm">
                    <BookOpen className="w-8 h-8" strokeWidth={1.5} />
                  </div>

                  <h4 className="font-serif text-lg font-bold text-forest mb-2">Amul Product Study</h4>
                  <p className="text-xs text-sage uppercase tracking-wider mb-6">Empirical Analysis</p>

                  <div className="space-y-3 text-left border-t border-stoneBorder/60 pt-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-forest/60">Scope:</span>
                      <span className="font-semibold text-forest">Consumer Analytics</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-forest/60">Key Focus:</span>
                      <span className="font-semibold text-forest">Retention Modeling</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-forest/60">Publication:</span>
                      <span className="font-semibold text-forest">ICARD4 Proceedings</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </AnimatedContent>

        </div>
      </section>

      {/* 7. SKILLS SECTION */}
      <section id="skills" className="py-24 md:py-20 bg-[#F2F0EB]/60 border-y border-stoneBorder/50 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Sticky Header Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <AnimatedContent distance={80} direction="vertical" duration={0.9}>
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="w-8 h-[1px] bg-sage" />
                  <span className="text-sm font-sans tracking-widest uppercase text-sage font-medium">Capabilities</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-forest leading-tight mb-6">
                  A toolkit optimized for <span className="italic font-normal text-terracotta">discoverability</span>.
                </h2>
                <p className="text-base text-forest/75 font-sans leading-relaxed">
                  Applying modern digital tools and workflows to maximize crawler visibility, identify high-intent search patterns,
                  and format responsive, readable layouts.
                </p>
              </AnimatedContent>
            </div>

            {/* Grid of tools and skills */}
            <div className="lg:col-span-8 space-y-12">

              {/* Category 1: Tools & Software */}
              <AnimatedContent distance={80} direction="vertical" duration={0.8} delay={0.1}>
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-terracotta" />
                    <span>Platforms & Optimization Software</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Google Analytics", desc: "User acquisition flow & behavior monitoring" },
                      { name: "Google Search Console", desc: "Index monitoring, crawl fixes & sitemap checks" },
                      { name: "SEMrush", desc: "Keyword gaps, backlink research & domain analysis" },
                      { name: "Ahrefs", desc: "Competitive audits, keyword planner extraction" },
                      { name: "Keyword Planner", desc: "Search density modeling & bid estimation" },
                      { name: "Answer the Public", desc: "Intent questions and editorial outlines mapping" }
                    ].map((tool, idx) => (
                      <div key={idx} className="bg-white border border-stoneBorder rounded-2xl p-5 hover:shadow-soft-sm transition-all duration-300">
                        <h4 className="font-serif text-base font-bold text-forest mb-1">{tool.name}</h4>
                        <p className="text-xs text-forest/65">{tool.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedContent>

              {/* Category 2: Technical & Soft Skills */}
              <AnimatedContent distance={80} direction="vertical" duration={0.8} delay={0.25}>
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sage" />
                    <span>Professional Skills</span>
                  </h3>

                  <div className="flex flex-wrap gap-3">
                    {[
                      "Communication (Written & Verbal)",
                      "Teamwork & Collaboration",
                      "Willingness to Learn & Grow",
                      "Problem-Solving Abilities",
                      "Critical Thinking Skills",
                      "On-Page Optimization",
                      "Link Building Outreach",
                      "Responsive UX Layouts",
                      "Audience Behavior Audits"
                    ].map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-5 py-2.5 rounded-full border border-stoneBorder bg-white text-sm text-forest font-sans tracking-wide hover:border-terracotta transition-colors duration-300 shadow-soft-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedContent>

              {/* Category 3: Languages */}
              <AnimatedContent distance={80} direction="vertical" duration={0.8} delay={0.4}>
                <div>
                  <h3 className="font-serif text-xl font-bold text-forest mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-forest" />
                    <span>Languages Spoken</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      { lang: "English", prof: "Professional Proficiency", percent: "95%" },
                      { lang: "Hindi", prof: "Fluent", percent: "85%" },
                      { lang: "Telugu", prof: "Native Speaker", percent: "100%" }
                    ].map((langObj, idx) => (
                      <div key={idx} className="bg-white border border-stoneBorder rounded-2xl p-5 shadow-soft-sm">
                        <div className="flex justify-between items-baseline mb-2">
                          <span className="font-serif text-base font-bold text-forest">{langObj.lang}</span>
                          <span className="text-xs text-sage font-medium">{langObj.percent}</span>
                        </div>
                        <p className="text-xs text-forest/60 mb-3">{langObj.prof}</p>
                        {/* Proficency indicator line */}
                        <div className="w-full h-1 bg-[#F2F0EB] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sage rounded-full"
                            style={{ width: langObj.percent }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedContent>

            </div>

          </div>

        </div>
      </section>

      {/* 8. EDUCATION SECTION */}
      <section id="education" className="py-24 md:py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          <AnimatedContent distance={80} direction="vertical" duration={0.9}>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-8 h-[1px] bg-sage" />
                <span className="text-sm font-sans tracking-widest uppercase text-sage font-medium">Academic Foundations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-forest leading-tight">
                Educational <span className="italic font-normal text-terracotta">Background</span>
              </h2>
            </div>
          </AnimatedContent>

          {/* Timeline Cards Container */}
          <div className="relative max-w-3xl mx-auto">
            {/* Organic timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] bg-dashed bg-stoneBorder transform -translate-x-1/2 hidden sm:block" style={{ borderLeft: '1px dashed #E6E2DA' }} />

            <div className="space-y-12">

              {/* Education Block 1 (Left on desktop) */}
              <AnimatedContent distance={80} direction="vertical" duration={0.8} delay={0.1}>
                <div className="relative flex flex-col sm:flex-row sm:justify-start items-start">
                  {/* Timeline node */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-forest border-4 border-alabaster transform -translate-x-1/2 z-10 hidden sm:block" />

                  <div className="w-full sm:w-[45%] bg-white border border-stoneBorder p-8 rounded-3xl shadow-soft-sm hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs uppercase tracking-widest font-semibold text-sage font-sans">2021 - 2024</span>
                      <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-xs font-bold font-sans">CGPA: 85%</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-forest mb-2">Bachelor of Commerce</h3>
                    <h4 className="text-sm text-forest/70 font-sans mb-4">Indira Priyadarshini Government Degree College for Women</h4>

                    <p className="text-xs text-forest/60 leading-relaxed font-sans">
                      Acquired functional insights in market economics, business accounts, and digital administration, mapping out commercial methodologies.
                    </p>
                  </div>
                </div>
              </AnimatedContent>

              {/* Education Block 2 (Right on desktop) */}
              <AnimatedContent distance={80} direction="vertical" duration={0.8} delay={0.25}>
                <div className="relative flex flex-col sm:flex-row sm:justify-end items-start">
                  {/* Timeline node */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-sage border-4 border-alabaster transform -translate-x-1/2 z-10 hidden sm:block" />

                  <div className="w-full sm:w-[45%] bg-white border border-stoneBorder p-8 rounded-3xl shadow-soft-sm hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs uppercase tracking-widest font-semibold text-sage font-sans">2019 - 2021</span>
                      <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-xs font-bold font-sans">CGPA: 82%</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-forest mb-2">Intermediate Education</h3>
                    <h4 className="text-sm text-forest/70 font-sans mb-4">Mahaboobia Junior College for Girls</h4>

                    <p className="text-xs text-forest/60 leading-relaxed font-sans">
                      Completed higher secondary coursework with distinction, focusing on trade principles and organizational coordination.
                    </p>
                  </div>
                </div>
              </AnimatedContent>

              {/* Education Block 3 (Left on desktop) */}
              <AnimatedContent distance={80} direction="vertical" duration={0.8} delay={0.4}>
                <div className="relative flex flex-col sm:flex-row sm:justify-start items-start">
                  {/* Timeline node */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-clay border-4 border-alabaster transform -translate-x-1/2 z-10 hidden sm:block" />

                  <div className="w-full sm:w-[45%] bg-white border border-stoneBorder p-8 rounded-3xl shadow-soft-sm hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs uppercase tracking-widest font-semibold text-sage font-sans">2019 Graduation</span>
                      <span className="px-3 py-1 rounded-full bg-sage/10 text-sage text-xs font-bold font-sans">CGPA: 72%</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-forest mb-2">Secondary School Certificate</h3>
                    <h4 className="text-sm text-forest/70 font-sans mb-4">Prabodh Girls High School</h4>

                    <p className="text-xs text-forest/60 leading-relaxed font-sans">
                      Completed basic secondary education syllabus with excellent performance across scientific and linguistic branches.
                    </p>
                  </div>
                </div>
              </AnimatedContent>

            </div>
          </div>

        </div>
      </section>

      {/* 9. CONTACT SECTION */}
      <section id="contact" className="py-24 md:py-20 bg-[#F2F0EB]/60 border-t border-stoneBorder/50 px-6 md:px-12 relative overflow-hidden">

        {/* Decorative Leaf in BG */}
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 opacity-5 pointer-events-none text-forest select-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 9.5a7 7 0 0 1-8 8.5zm0 0v-8" strokeWidth={0.8} />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Contact details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <AnimatedContent distance={80} direction="vertical" duration={0.9}>
                <div>
                  <div className="inline-flex items-center gap-2 mb-6">
                    <span className="w-8 h-[1px] bg-sage" />
                    <span className="text-sm font-sans tracking-widest uppercase text-sage font-medium">Get In Touch</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-forest leading-tight mb-8">
                    Let's create organic growth <span className="italic font-normal text-terracotta">together</span>.
                  </h2>
                  <p className="text-base text-forest/80 font-sans leading-relaxed mb-12">
                    Interested in auditing your current organic visibility, aligning keyword models, or developing a search-friendly web layout? Send a message and let's start mapping out your brand's natural trajectory.
                  </p>
                </div>
              </AnimatedContent>

              {/* Direct details */}
              <AnimatedContent distance={60} direction="vertical" duration={0.8} delay={0.2}>
                <div className="space-y-6 mb-12 lg:mb-0">
                  <a
                    href="mailto:sirigirianusha9@gmail.com"
                    className="flex gap-4 items-center group w-fit"
                    aria-label="Send email to sirigirianusha9@gmail.com"
                  >
                    <div className="w-12 h-12 rounded-full border border-stoneBorder bg-alabaster flex items-center justify-center text-sage group-hover:text-terracotta group-hover:border-terracotta transition-colors duration-300">
                      <Mail className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-sage font-semibold font-sans">Email</h5>
                      <p className="text-sm font-bold text-forest group-hover:text-terracotta transition-colors">sirigirianusha9@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:+918978668628"
                    className="flex gap-4 items-center group w-fit"
                    aria-label="Call +91 8978668628"
                  >
                    <div className="w-12 h-12 rounded-full border border-stoneBorder bg-alabaster flex items-center justify-center text-sage group-hover:text-terracotta group-hover:border-terracotta transition-colors duration-300">
                      <Phone className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-sage font-semibold font-sans">Phone</h5>
                      <p className="text-sm font-bold text-forest group-hover:text-terracotta transition-colors">+91 8978668628</p>
                    </div>
                  </a>

                  <div className="flex gap-4 items-center w-fit">
                    <div className="w-12 h-12 rounded-full border border-stoneBorder bg-alabaster flex items-center justify-center text-sage">
                      <MapPin className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-sage font-semibold font-sans">Location</h5>
                      <p className="text-sm font-bold text-forest">Karwan, Puranapool, Hyderabad, India</p>
                    </div>
                  </div>

                  <a
                    href="https://linkedin.com/in/s-anusha-160848333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 items-center group w-fit"
                    aria-label="Visit LinkedIn profile of Anusha Sirigiri"
                  >
                    <div className="w-12 h-12 rounded-full border border-stoneBorder bg-alabaster flex items-center justify-center text-sage group-hover:text-terracotta group-hover:border-terracotta transition-colors duration-300">
                      <Linkedin className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h5 className="text-xs uppercase tracking-widest text-sage font-semibold font-sans">LinkedIn</h5>
                      <p className="text-sm font-bold text-forest group-hover:text-terracotta transition-colors">linkedin.com/in/s-anusha-160848333</p>
                    </div>
                  </a>
                </div>
              </AnimatedContent>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <AnimatedContent distance={90} direction="vertical" duration={0.9} delay={0.25}>
                <div className="bg-white border border-stoneBorder p-8 md:p-12 rounded-[40px] shadow-soft-lg">
                  <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {/* Name field */}
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-xs uppercase tracking-widest text-sage font-semibold mb-2">Your Name *</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleInputChange}
                          placeholder="Anusha Sirigiri"
                          className="bg-transparent border-b border-stoneBorder py-3 text-forest text-sm font-sans focus:outline-none focus:border-sage transition-colors placeholder:text-forest/30"
                        />
                      </div>

                      {/* Email field */}
                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-xs uppercase tracking-widest text-sage font-semibold mb-2">Your Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleInputChange}
                          placeholder="hello@example.com"
                          className="bg-transparent border-b border-stoneBorder py-3 text-forest text-sm font-sans focus:outline-none focus:border-sage transition-colors placeholder:text-forest/30"
                        />
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="flex flex-col">
                      <label htmlFor="subject" className="text-xs uppercase tracking-widest text-sage font-semibold mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        placeholder="SEO Consultation Request"
                        className="bg-transparent border-b border-stoneBorder py-3 text-forest text-sm font-sans focus:outline-none focus:border-sage transition-colors placeholder:text-forest/30"
                      />
                    </div>

                    {/* Message field */}
                    <div className="flex flex-col">
                      <label htmlFor="message" className="text-xs uppercase tracking-widest text-sage font-semibold mb-2">Your Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={handleInputChange}
                        placeholder="Describe your project, website goals, or timeline requirements..."
                        className="bg-transparent border-b border-stoneBorder py-3 text-forest text-sm font-sans focus:outline-none focus:border-sage transition-colors placeholder:text-forest/30 resize-none"
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto h-14 px-10 bg-forest hover:bg-terracotta text-alabaster text-sm uppercase tracking-widest font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-soft-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                        </>
                      )}
                    </button>

                  </form>
                </div>
              </AnimatedContent>
            </div>

          </div>

          {/* Declaration and Footer bottom */}
          <AnimatedContent distance={40} direction="vertical" duration={0.7} delay={0.2}>
            <div className="mt-24 pt-12 border-t border-stoneBorder/60 flex flex-col md:flex-row justify-between items-center gap-6">

              {/* Declaration Card */}
              <div className="max-w-md text-center md:text-left bg-alabaster/40 border border-stoneBorder/45 p-5 rounded-2xl">
                <span className="text-[10px] uppercase tracking-widest text-sage font-semibold block mb-1">Formal Declaration</span>
                <p className="text-[11px] text-forest/65 italic leading-relaxed">
                  "I hereby declare that the information provided is true to the best of my knowledge." — Anusha Sirigiri
                </p>
              </div>

              {/* Copyright & Signoff */}
              <div className="text-center md:text-right">
                <p className="text-sm font-serif text-forest font-bold mb-1">Anusha Sirigiri</p>
                <p className="text-xs text-sage tracking-wider mb-2">© 2026. Made with React & Tailwind. All rights reserved.</p>
                <a
                  href="https://linkedin.com/in/s-anusha-160848333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-sage hover:text-terracotta transition-colors tracking-wider"
                >
                  <Linkedin className="w-3 h-3" />
                  <span>linkedin.com/in/s-anusha-160848333</span>
                </a>
              </div>

            </div>
          </AnimatedContent>

        </div>
      </section>

    </div>
  );
}
