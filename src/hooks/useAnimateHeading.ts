import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Custom React hook to animate a heading element using GSAP's SplitText and ScrollTrigger plugins.
 *
 * This hook splits the heading text into individual characters and animates them with a vertical
 * entrance and fade-in effect. The animation can be triggered by scroll position using ScrollTrigger
 * configuration, or play immediately on mount.
 *
 * @param {Object} [options] - Optional configuration object.
 * @param {ScrollTrigger.Vars} [options.scrollTriggerVars] - Optional ScrollTrigger configuration for GSAP.
 *   If provided, the animation will be triggered based on scroll position according to these settings.
 *   If omitted, the animation will play immediately on mount.
 * @param {RefObject<HTMLHeadingElement | null>} [options.triggerHeadingRef] - Optional React ref to a heading element.
 *   If provided, this ref will be used as the target for the animation.
 *   If omitted, the hook will create and return its own ref.
 *
 * @returns {RefObject<HTMLHeadingElement>} - A React ref to be attached to the heading element to be animated.
 *   If `triggerHeadingRef` is provided, it is returned as-is. Otherwise, a new ref is created and returned.
 *
 * @example
 * // Usage in a component:
 * const headingRef = useAnimateHeading();
 * // or with scrollTriggerVars:
 * const headingRef = useAnimateHeading({ scrollTriggerVars: { start: "top 80%" } });
 * return <h1 ref={headingRef}>Animated Heading</h1>;
 */
export function useAnimateHeading({
  scrollTriggerVars,
  triggerHeadingRef,
}: {
  scrollTriggerVars?: ScrollTrigger.Vars;
  triggerHeadingRef?: RefObject<HTMLHeadingElement | null>;
} = {}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const targetRef = triggerHeadingRef ?? headingRef;

  useLayoutEffect(() => {
    if (!targetRef.current) return;

    const split = new SplitText(targetRef.current, {
      type: "chars",
    });

    const tween = gsap.from(split.chars, {
      y: 80,
      opacity: 0,
      stagger: 0.05,
      ease: "expo.out",
      duration: 1,
      ...(scrollTriggerVars
        ? {
            scrollTrigger: {
              trigger: targetRef.current,
              ...scrollTriggerVars,
            },
          }
        : {}),
    });

    return () => {
      tween.kill();
      split.revert(); // revert text split
    };
  }, []);

  return targetRef;
}
