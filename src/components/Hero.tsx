import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useEffect, useRef, useState } from "react";
import { useAnimateHeading } from "../hooks/useAnimateHeading";

const Hero = () => {
  const heroLeftLeaf = useRef<HTMLDivElement>(null);
  const heroRightLeaf = useRef<HTMLDivElement>(null);
  const animatedVideoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useAnimateHeading();

  const [navbarHeight, setNavbarHeight] = useState<number | undefined>(
    undefined,
  );

  useGSAP(() => {
    // Leaves animations
    gsap.to(heroLeftLeaf.current, {
      y: -200,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to(heroRightLeaf.current, {
      y: 200,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    //  Hero text animation
    // Content text
    const paragraphs = gsap.utils.toArray<HTMLDivElement>("#hero--text");

    const heroTextTimeline = gsap.timeline();

    const splitText1 = SplitText.create(paragraphs[0], {
      type: "lines",
    });
    const splitText1Tween = gsap.from(splitText1.lines, {
      yPercent: 150,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.01,
    });

    const splitText2 = SplitText.create(paragraphs[1], {
      type: "lines",
    });
    const splitText2Tween = gsap.from(splitText2.lines, {
      yPercent: 150,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
      stagger: 0.01,
    });

    heroTextTimeline.add(splitText1Tween, "-=0.8");
    heroTextTimeline.add(splitText2Tween, "<");

    if (!animatedVideoRef.current) throw new Error("Video not found.");
    animatedVideoRef.current.onloadedmetadata = () => {
      const isMobile = window.innerWidth < 480;
      gsap.to(animatedVideoRef.current, {
        ease: "none",
        currentTime: animatedVideoRef.current?.duration,
        transformOrigin: "bottom",
        scale: 0.8,
        scrollTrigger: {
          trigger: "video",
          start: "center 50%",
          end: isMobile ? "bottom 30%" : "bottom top",
          scrub: true,
          pin: true,
          // markers: true,
        },
      });
    };
  });

  useEffect(() => {
    const navbarHeight = document.querySelector("nav")?.offsetHeight;
    setNavbarHeight(navbarHeight);
  }, []);

  return (
    <>
      <section
        id="hero"
        className={
          "relative z-1 flex min-h-screen flex-col items-center justify-start gap-8 px-6 text-white md:px-4"
        }
        style={{
          paddingTop: (navbarHeight ?? 80) + 32,
        }}
      >
        <div
          ref={heroLeftLeaf}
          className="absolute bottom-0 left-0 w-[35%] md:w-[25%]"
        >
          <img
            src="/images/hero-left-leaf.png"
            alt="hero-left-leaf"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          ref={heroRightLeaf}
          className="absolute right-0 w-[35%] md:w-[25%]"
        >
          <img
            src="/images/hero-right-leaf.png"
            alt="hero-left-leaf"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Heading */}
        <h1 ref={headingRef} className="heading">
          Mojito
        </h1>

        <div
          id="hero--text--container"
          className="flex w-full flex-col items-center justify-around gap-8 text-[clamp(.75rem,4vw,1.2rem)] leading-[2] md:flex-row md:px-8 md:py-4"
        >
          <div
            id="hero--text"
            className="hidden max-w-[20ch] lg:self-start xl:inline"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            cupiditate delectus minima eligendi iusto aliquid officia quo saepe
            distinctio repudiandae.
          </div>
          <div
            id="hero--text"
            className="hidden max-w-[20ch] md:self-end xl:inline"
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            earum ea voluptatibus repellat molestiae atque debitis ullam quas,
            quibusdam necessitatibus.
          </div>
        </div>
      </section>

      {/* Animated Video Elem */}

      <video
        ref={animatedVideoRef}
        /**
         * This video is frame-enhanced by FFmpeg.org because usual video frames
         * aren't optimized for rich frame-by-frame animation
         * */
        src="/videos/output.mp4"
        playsInline
        muted
        preload="auto"
        className="absolute bottom-0 left-0 h-full w-full object-cover"
      />
    </>
  );
};

export default Hero;
