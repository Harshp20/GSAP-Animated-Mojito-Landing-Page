import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const heroLeftLeaf = useRef<HTMLDivElement>(null);
  const heroRightLeaf = useRef<HTMLDivElement>(null);
  const animatedVideoRef = useRef<HTMLVideoElement>(null);

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
    // Heading
    const headingText = SplitText.create("h1", { type: "chars" });
    const headerTextTween = gsap.from(headingText.chars, {
      y: -20,
      opacity: 0,
      stagger: 0.03,
      ease: "power4.inOut",
      duration: 0.6,
    });

    // Content text
    const paragraphs = gsap.utils.toArray<HTMLDivElement>("#hero--text");

    const heroTextTimeline = gsap.timeline();

    const splitText1 = SplitText.create(paragraphs[0], {
      type: "lines, chars",
    });
    const splitText1Tween = gsap.from(splitText1.lines, {
      x: -200,
      opacity: 0,
      duration: 0.6,
      ease: "power4.inOut",
      stagger: 0.03,
    });

    const splitText2 = SplitText.create(paragraphs[1], {
      type: "lines, chars",
    });
    const splitText2Tween = gsap.from(splitText2.lines, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power4.inOut",
      stagger: 0.03,
    });

    const splitText3 = SplitText.create(paragraphs[2], {
      type: "lines, chars",
    });
    const splitText3Tween = gsap.from(splitText3.lines, {
      x: 200,
      opacity: 0,
      duration: 0.6,
      ease: "power4.inOut",
      stagger: 0.03,
    });

    heroTextTimeline.add(headerTextTween);
    heroTextTimeline.add(splitText1Tween, "-=0.3");
    heroTextTimeline.add(splitText3Tween, "-=0.3");
    heroTextTimeline.add(splitText2Tween, "-=0.3");

    if (!animatedVideoRef.current) throw new Error("Video not found.");
    animatedVideoRef.current.onloadedmetadata = () => {
      gsap.to(animatedVideoRef.current, {
        ease: "none",
        currentTime: animatedVideoRef.current?.duration,
        scrollTrigger: {
          trigger: "#hero",
          start: "center 50%",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });
    };
  });

  return (
    <section
      id="hero"
      className="relative grid h-screen place-items-end text-white"
    >
      <div ref={heroLeftLeaf} className="absolute bottom-0 left-0 z-1 w-[25%]">
        <img
          src="/images/hero-left-leaf.png"
          alt="hero-left-leaf"
          className="h-full w-full object-cover"
        />
      </div>
      <div ref={heroRightLeaf} className="bottom absolute right-0 z-1 w-[25%]">
        <img
          src="/images/hero-right-leaf.png"
          alt="hero-left-leaf"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Heading */}
      <h1 className="z-3 w-full text-center font-serif text-9xl">Mojito</h1>

      <div
        id="hero--text--container"
        className="z-3 flex h-[80%] w-full justify-between leading-[2] md:px-8 md:py-4"
      >
        <div id="hero--text" className="max-w-[20ch] self-start">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          cupiditate delectus minima eligendi iusto aliquid officia quo saepe
          distinctio repudiandae.
        </div>
        <div id="hero--text" className="self-center md:w-[60ch]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ipsam
          eveniet enim cum? A, quam modi vero animi nobis cupiditate praesentium
          quia suscipit aspernatur, veritatis tempore, accusamus sapiente
          voluptatem perferendis facilis quidem similique ad. Qui aliquid
          aliquam, officia molestias vitae deleniti culpa corporis sint
          distinctio minus, voluptatem excepturi, dolor sed vel. Exercitationem,
          amet maiores a sequi explicabo architecto molestiae quas laboriosam
          modi iure, accusantium nisi fugit assumenda, voluptatibus dicta.
          Possimus exercitationem minima ratione cum minus, quasi est placeat
          distinctio doloremque quis explicabo hic delectus, harum odio.
          Dolores, maxime laboriosam debitis aspernatur incidunt magni
          obcaecati! Veritatis optio voluptas nostrum consectetur et?
        </div>
        <div id="hero--text" className="max-w-[20ch] self-end">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
          earum ea voluptatibus repellat molestiae atque debitis ullam quas,
          quibusdam necessitatibus.
        </div>
      </div>

      {/* Animated Video Elem */}
      <video
        ref={animatedVideoRef}
        src="/videos/input.mp4"
        playsInline
        muted
        preload="auto"
        className="absolute bottom-0 h-[70%] w-full"
      />
    </section>
  );
};

export default Hero;
