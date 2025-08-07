import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Navbar = () => {
  const navbarRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    // Navbar
    const navbarHeight = navbarRef.current?.offsetHeight;
    gsap.to("nav", {
      backdropFilter: "blur(5px)",
      scrollTrigger: {
        trigger: document.body,
        start: `top+=${navbarHeight || 100} top`,
        toggleActions: "play none none reset",
        toggleClass: { targets: "nav", className: "bg-black/25" },
      },
    });
  }, []);

  const navBarItems = [
    { title: "Home", id: "#hero" },
    { title: "About", id: "#about" },
    { title: "Contact", id: "#contact" },
    { title: "Pricing", id: "#pricing" },
  ];

  const handleClick = (id: string) => {
    gsap.to(window, { scrollTo: id, ease: "power4.inOut", duration: 1 });
  };

  return (
    <nav
      ref={navbarRef}
      className="fixed top-0 z-20 flex w-full items-center bg-black p-6 text-white"
    >
      <div className="logo text-3x px-10 font-serif">Logo</div>
      <ul className="ml-auto flex w-[50%] items-center justify-evenly">
        {navBarItems.map((navItem) => (
          <li
            onClick={() => handleClick(navItem.id)}
            className="cursor-pointer rounded-md border-0 px-3 py-1 text-white/90 hover:text-white"
            key={navItem.id}
          >
            {navItem.title}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
