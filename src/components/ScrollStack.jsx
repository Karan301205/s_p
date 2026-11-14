import { useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (t) => t * t * (3 - 2 * t);

// Layout offset of `el` inside `ancestor`, ignoring transforms (e.g. reveal animations).
const offsetWithin = (el, ancestor) => {
  let y = 0;
  let node = el;
  while (node && node !== ancestor) {
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return node === ancestor ? y : null;
};

/**
 * Stacks cards on scroll. The front card always pins at full size, vertically
 * centred in the viewport (below `topOffset`, e.g. a fixed navbar). Cards that
 * have been covered lift up by `itemStackDistance` and shrink by `itemScale`
 * per card on top of them, so they peek out evenly above the front card.
 * Only `maxVisible` cards peek out; deeper ones fade away. Once the last card
 * lands, the finished stack holds for `holdDistance` and then scrolls away
 * as one piece.
 *
 * Optional `header`: rendered above the cards and docked under `topOffset`
 * while the stack plays. On the way in, its `[data-stack-fade]` elements fade
 * out and its `[data-stack-shrink]` element scales down towards
 * `headerMinFontSize`; the cards then centre in the space below it. The header
 * leaves together with the finished stack.
 */
const ScrollStack = ({
  children,
  className = '',
  itemDistance = 80,
  itemScale = 0.04,
  itemStackDistance = 20,
  maxVisible = 3,
  topOffset = 0,
  holdDistance = '25%',
  header = null,
  headerSpacing = 12,
  headerMinFontSize = 36,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const headerRef = useRef(null);
  const lastHeaderRef = useRef(null);
  const cardsRef = useRef([]);
  const layoutRef = useRef({ tops: [], pinTops: [], hold: 0, header: null });
  const lastTransformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);

  const parseLength = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value) || 0;
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return { scrollTop: window.scrollY, containerHeight: window.innerHeight };
    }
    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller ? scroller.scrollTop : 0,
      containerHeight: scroller ? scroller.clientHeight : window.innerHeight
    };
  }, [useWindowScroll]);

  // Static (untransformed) layout: card tops, the pinned front position and the hold length.
  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    const cards = cardsRef.current;
    if (!scroller || !cards.length) return;

    const { containerHeight } = getScrollData();
    const hold = Math.max(0, parseLength(holdDistance, containerHeight));

    // The end spacer gives the last card room to stay pinned during the hold
    // without overflowing the section.
    const endElement = scroller.querySelector('.scroll-stack-end');
    if (endElement && endElement.style.height !== `${hold}px`) {
      endElement.style.height = `${hold}px`;
    }

    const scrollerTop = useWindowScroll ? scroller.getBoundingClientRect().top + window.scrollY : 0;
    const tops = cards.map(card => scrollerTop + card.offsetTop);
    const heights = cards.map(card => card.offsetHeight);
    const tallest = Math.max(...heights);

    // Docked header: where it pins, how far the shrink runs, and how tall it is once compact.
    let headerLayout = null;
    let cardsAreaTop = topOffset;
    const headerEl = headerRef.current;
    if (headerEl) {
      const shrinkEl = headerEl.querySelector('[data-stack-shrink]');
      let scale = 1;
      let compactHeight = headerEl.offsetHeight;
      if (shrinkEl) {
        const fontSize = parseFloat(getComputedStyle(shrinkEl).fontSize) || headerMinFontSize;
        scale = clamp(headerMinFontSize / fontSize, 0.6, 0.85);
        const shrinkTop = offsetWithin(shrinkEl, headerEl);
        if (shrinkTop !== null) compactHeight = shrinkTop + shrinkEl.offsetHeight * scale;
      }
      headerEl.style.setProperty('--stack-header-scale', `${scale}`);

      const pinY = topOffset + headerSpacing;
      headerLayout = {
        top: scrollerTop + headerEl.offsetTop,
        pinY,
        // The fade/shrink plays out over this much scroll before the header docks.
        transition: Math.min(containerHeight * 0.35, 300)
      };
      cardsAreaTop = pinY + compactHeight + headerSpacing * 2;
    }

    // Centre the front card in the space below the navbar/header; the peeking cards
    // use the room above it (never less than they need).
    const peek = itemStackDistance * maxVisible;
    const available = containerHeight - cardsAreaTop;
    const frontTop = cardsAreaTop + Math.max(peek, (available - tallest) / 2);

    // On short screens a card taller than the free space pins higher, so its
    // bottom edge is always visible (it may then slide over the docked header).
    const pinTops = heights.map(height =>
      Math.max(topOffset + 8, Math.min(frontTop, containerHeight - 16 - height))
    );

    layoutRef.current = { tops, pinTops, hold, header: headerLayout };
  }, [getScrollData, parseLength, holdDistance, useWindowScroll, itemStackDistance, maxVisible, topOffset, headerSpacing, headerMinFontSize]);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    const { tops, pinTops, hold, header: headerLayout } = layoutRef.current;
    if (!cards.length || tops.length !== cards.length) return;

    const { scrollTop } = getScrollData();
    const count = cards.length;
    const pinStarts = tops.map((top, i) => top - pinTops[i]);
    const releaseAt = pinStarts[count - 1] + hold;
    // After release the stack is frozen in place and scrolls away with the page.
    const s = Math.min(scrollTop, releaseAt);

    // Header: fade/shrink on the way in, dock under the navbar, leave with the stack.
    const headerEl = headerRef.current;
    if (headerEl && headerLayout) {
      const dockAt = headerLayout.top - headerLayout.pinY;
      const progress = smoothstep(clamp((s - (dockAt - headerLayout.transition)) / headerLayout.transition, 0, 1));
      const translateY = Math.round(Math.max(0, s - dockAt) * 100) / 100;
      const roundedProgress = Math.round(progress * 1000) / 1000;
      const last = lastHeaderRef.current;
      if (!last || last.translateY !== translateY || last.progress !== roundedProgress) {
        headerEl.style.transform = `translate3d(0, ${translateY}px, 0)`;
        headerEl.style.setProperty('--stack-header-progress', `${roundedProgress}`);
        lastHeaderRef.current = { translateY, progress: roundedProgress };
      }
    }

    // How far each card has slid over the card before it (0 → 1).
    const cover = pinStarts.map((pinStart, j) => {
      if (j === 0) return 0;
      const approach = Math.max(1, (tops[j] - tops[j - 1]) * 0.6);
      return clamp((s - (pinStart - approach)) / approach, 0, 1);
    });

    let depth = 0; // number of cards stacked on top of card i (fractional while animating)
    for (let i = count - 1; i >= 0; i--) {
      const card = cards[i];
      const level = Math.min(depth, maxVisible + 1);

      const pinned = Math.max(0, s - pinStarts[i]);
      const translateY = Math.round((pinned - itemStackDistance * level) * 100) / 100;
      const scale = Math.round((1 - itemScale * level) * 1000) / 1000;
      const opacity = Math.round(clamp(maxVisible + 1 - depth, 0, 1) * 100) / 100;

      const last = lastTransformsRef.current.get(i);
      if (
        !last ||
        Math.abs(last.translateY - translateY) > 0.1 ||
        Math.abs(last.scale - scale) > 0.0005 ||
        last.opacity !== opacity
      ) {
        card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
        card.style.opacity = `${opacity}`;
        lastTransformsRef.current.set(i, { translateY, scale, opacity });
      }

      depth += cover[i];
    }

    const isComplete = scrollTop >= pinStarts[count - 1];
    if (isComplete && !stackCompletedRef.current) {
      stackCompletedRef.current = true;
      onStackComplete?.();
    } else if (!isComplete && stackCompletedRef.current) {
      stackCompletedRef.current = false;
    }
  }, [getScrollData, itemScale, itemStackDistance, maxVisible, onStackComplete]);

  const setupLenis = useCallback(() => {
    const options = {
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075
    };

    let lenis;
    if (useWindowScroll) {
      lenis = new Lenis({ ...options, touchMultiplier: 1.5 });
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      lenis = new Lenis({
        ...options,
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        touchMultiplier: 2,
        gestureOrientationHandler: true,
        normalizeWheel: true,
        touchInertiaMultiplier: 35,
        touchInertia: 0.6
      });
    }

    lenis.on('scroll', updateCardTransforms);
    const raf = time => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, [updateCardTransforms, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.zIndex = `${i + 1}`;
      card.style.willChange = 'transform, opacity';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    const refresh = () => {
      measure();
      updateCardTransforms();
    };

    refresh();
    setupLenis();

    // Re-measure whenever layout above or inside the stack changes
    // (web fonts swapping in, images loading, viewport resizing).
    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(document.body);
    resizeObserver.observe(scroller);
    document.fonts?.ready.then(refresh);
    window.addEventListener('resize', refresh);
    const scrollTarget = useWindowScroll ? window : scroller;
    scrollTarget.addEventListener('scroll', updateCardTransforms, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', refresh);
      scrollTarget.removeEventListener('scroll', updateCardTransforms);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      lenisRef.current?.destroy();
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      lastHeaderRef.current = null;
    };
  }, [itemDistance, useWindowScroll, measure, updateCardTransforms, setupLenis]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-window-mode' : ''} ${className}`.trim()}
      ref={scrollerRef}
    >
      {header && (
        <div className="scroll-stack-header" ref={headerRef}>
          {header}
        </div>
      )}
      <div className="scroll-stack-inner">
        {children}
        {/* Spacer that lets the finished stack hold before it scrolls away */}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
