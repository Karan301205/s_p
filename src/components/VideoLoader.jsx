import React, { useState, useEffect, useRef } from 'react';

export default function VideoLoader({ onComplete }) {
  const videoRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasStartedTransition, setHasStartedTransition] = useState(false);

  const TARGET_DURATION = 9; // 9 seconds

  const startTransition = () => {
    if (hasStartedTransition) return;
    setHasStartedTransition(true);
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 1000); // 1000ms smooth fade transition
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    if (current >= TARGET_DURATION && !hasStartedTransition) {
      startTransition();
    }
  };

  const handleVideoEnded = () => {
    if (!hasStartedTransition) {
      startTransition();
    }
  };

  useEffect(() => {
    // Attempt autoplay immediately
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      });
    }

    // Safety fallback timer if video fails to load or stalls
    const fallbackTimer = setTimeout(() => {
      if (!hasStartedTransition) {
        startTransition();
      }
    }, TARGET_DURATION * 1000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#EAE8E3] flex items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out ${
        isFadingOut
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Seamless full screen video */}
      <video
        ref={videoRef}
        src="/make_a_video_of_this_charcter.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="w-full h-full object-cover object-center"
      />

      {/* Subtle paper grain texture overlay matching the website */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
