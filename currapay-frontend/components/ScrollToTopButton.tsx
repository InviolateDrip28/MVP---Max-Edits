import { useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

/** scroll to top button. appears when you reach the footer */
export const ScrollToTopButton = () => {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    // Show the button when the user scrolls down
    if (window.scrollY > (window.innerHeight * 3)) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`
        
        text-accentSecondary bg-white glass rounded-full drop-shadow-xl z-[99] p-3 scrollToTopButton animate-bounce ${
        isVisible ? "visible opacity-1" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="h-6 w-6" />
    </button>
  );
};
