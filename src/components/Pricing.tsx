import { useGSAP } from "@gsap/react";
import { cocktailLists, mockTailLists } from "../constants";
import gsap from "gsap";
import { useAnimateHeading } from "../hooks/useAnimateHeading";

const Pricing = () => {
  const headingRef = useAnimateHeading({
    start: "top 70%",
  });

  useGSAP(() => {
    gsap.from("#pricing-card", {
      yPercent: 100,
      opacity: 0,
      duration: 1.5,
      ease: "expo.out",
      scrollTrigger: {
        trigger: "#pricing-card",
        start: "top 90%",
        // markers: true,
      },
    });
  }, []);

  return (
    <section
      id="pricing-section"
      className="margin-4 relative z-1 flex h-screen w-full flex-col justify-evenly"
    >
      <h1 ref={headingRef} className="heading-2">
        Cocktails
      </h1>

      <div className="flex items-center justify-around px-16 text-amber-50">
        <div
          id="pricing-card"
          className="flex w-[35ch] flex-col gap-4 px-4 py-2"
        >
          <span>Most Popular Cocktails</span>
          <div className="flex flex-col justify-around gap-4">
            {cocktailLists.map((item) => (
              <p className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </p>
            ))}
          </div>
        </div>

        <div
          id="pricing-card"
          className="flex w-[35ch] flex-col gap-4 px-4 py-2"
        >
          <span>Most Popular Mocktails</span>
          <div className="flex flex-col justify-around gap-4">
            {mockTailLists.map((item) => (
              <p className="flex justify-between">
                <span>{item.name}</span>
                <span>{item.price}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
