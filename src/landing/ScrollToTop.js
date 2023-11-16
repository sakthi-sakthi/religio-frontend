import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    scroltoSection(hash);
  }, [pathname, hash]);

  scroltoSection(hash);

  return null;
}

function scroltoSection(hash) {
  switch (hash) {
    case "":
      window.scrollTo(0, 0);
      break;
    case "#Feature":
      window.scrollTo(0, 800);
      break;
    case "#Services":
      window.scrollTo(0, 1700);
      break;
    case "#Gallery":
      window.scrollTo(0, 4500);
      break;
    default:
      break;
  }
}
