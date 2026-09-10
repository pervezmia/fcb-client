"use client";
import { useState, useEffect } from "react";

export default function HeroBanner() {
  const fullText = "FC Boraitola Fans & Players";
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
          setSpeed(80);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setSpeed(120);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, speed, fullText]);

  return (
    <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
      The Ultimate Home for <br />
      <span className=" bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-red-500">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </h1>
  );
}