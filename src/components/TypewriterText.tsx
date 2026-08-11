"use client";
import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  start: boolean;
  speed?: number;
  delay?: number;
}

export default function TypewriterText({ text, start, speed = 40, delay = 0 }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  
  useEffect(() => {
    if (!start) return;
    
    let i = 0;
    const delayTimer = setTimeout(() => {
      const timer = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(timer);
        }
      }, speed);
      
      return () => clearInterval(timer);
    }, delay);
    
    return () => clearTimeout(delayTimer);
  }, [text, start, speed, delay]);

  return <span>{displayed}</span>;
}
