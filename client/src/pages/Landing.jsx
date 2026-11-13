// /Purpose: Public home page: Hero, Features aur HowItWorks ek ke neeche ek. URL mein #features jaisa hash ho, to us section tak scroll karta hai.


import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Features from "../components/landing/Features.jsx";
import Hero from "../components/landing/Hero.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";

export default function Landing() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
    </>
  );
}