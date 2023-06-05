"use client";

import { useEffect, useRef } from "react";

interface TypingAnimationProps {
  text: string[];
  fontSize?: "fs-1" | "fs-2" | "fs-3" | "fs-4" | "fs-5";
}

export default function TypingAnimation({
  text,
  fontSize = "fs-1",
}: TypingAnimationProps) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { current } = el;
    let loopNum = 0;
    let isDeleting = false;
    let tempText = "";
    let timerId: ReturnType<typeof setTimeout>;

    if (current) {
      animating(current, text, 2000);
    }

    function animating(
      el: HTMLDivElement,
      textArray: string[],
      period: number
    ) {
      let idx = loopNum % textArray.length;
      let fullText = textArray[idx];

      if (isDeleting) {
        tempText = fullText.substring(0, tempText.length - 1);
      } else {
        tempText = fullText.substring(0, tempText.length + 1);
      }

      el.innerHTML = `<span class=${fontSize}>${tempText}</span>`;

      // 좀 더 자연스럽게 typing 되는 느낌을 주기 위해
      let delta = 200 - Math.random() * 100;

      if (isDeleting) {
        delta /= 2;
      }

      if (!isDeleting && fullText === tempText) {
        // stop
        if (idx + 1 === textArray.length) {
          return;
        }
        //문장이 완성되었을 경우 2초간 유지한다.
        delta = period;
        isDeleting = true;
      } else if (isDeleting && tempText === "") {
        isDeleting = false;
        loopNum++;
        delta = 500;
      }

      timerId = setTimeout(() => {
        animating(el, textArray, period);
      }, delta);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div ref={el}>
      <span className="wrap"></span>
    </div>
  );
}
