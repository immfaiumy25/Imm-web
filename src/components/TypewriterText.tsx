"use client";
import { useState, useEffect } from "react";

export default function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const introMaxScroll = window.innerHeight * 0.65;
      let progress = scrollY / introMaxScroll;
      
      const startProgress = 0.15;
      const endProgress = 0.85;
      
      let mappedProgress = (progress - startProgress) / (endProgress - startProgress);
      if (mappedProgress < 0) mappedProgress = 0;
      if (mappedProgress > 1) mappedProgress = 1;
      
      const charsToShow = Math.floor(mappedProgress * text.length);
      setDisplayed(text.slice(0, charsToShow));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial setup

    return () => window.removeEventListener("scroll", handleScroll);
  }, [text]);

  return <span>{displayed}</span>;
}
