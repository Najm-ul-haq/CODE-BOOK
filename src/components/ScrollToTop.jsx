import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If a hash anchor is provided (e.g. #services, #contact), smoothly scroll to that section
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        const timer = setTimeout(scrollToHash, 60);
        return () => clearTimeout(timer);
      }
      return;
    }

    // When navigating to any page (Products, Home, Project Details), instantly reset scroll to top!
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, hash]);

  return null;
}
