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
    if (!start) {
      setDisplayed("");
      return;
    }
    
    let timer: NodeJS.Timeout;
    let i = 0;
    const delayTimer = setTimeout(() => {
      timer = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(timer);
        }
      }, speed);
    }, delay);
    
    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, start, speed, delay]);

  return <span>{displayed}</span>;
}
