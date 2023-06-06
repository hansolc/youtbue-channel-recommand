"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FirstBanner from "./banners/FirstBanner";
import SecondBanner from "./banners/SecondBanner";
import ThirdBanner from "./banners/ThirdBanner";
import styles from "./page.module.scss";
import { throttle } from "lodash";

const temp = [0, 937, 1874];

export default function HomePage() {
  const wrapperEl = useRef<HTMLDivElement>(null);
  const [temp, setTemp] = useState<number>(0);
  useEffect(() => {
    window.scrollTo(0, temp);
  }, [temp]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          const { isIntersecting, target } = entry;
          const { top } = entry.intersectionRect;
          //   console.log(isIntersecting, target);
          console.log(target);
          if (isIntersecting) {
            const moveY = target.getBoundingClientRect().top + window.scrollY;
            console.log(moveY);
            // window.scroll({
            //   top: moveY,
            //   behavior: "smooth",
            // });
            setTemp(moveY);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (wrapperEl.current) {
      const { current } = wrapperEl;
      for (let i = 0; i < current.children.length; i++) {
        io.observe(current.children[i]);
      }
    }
    // setTimeout(() => {
    //   window.scrollTo(0, 937);
    // }, 1000);
  }, []);
  console.log("render");
  return (
    <div className={styles.wrapper} ref={wrapperEl}>
      <FirstBanner />
      <SecondBanner />
      <ThirdBanner />
      <button
        style={{ position: "fixed", top: 0 }}
        onClick={() => window.scroll(0, 937)}
      >
        클릭
      </button>
      <button
        style={{ position: "fixed", top: 0, left: 500 }}
        onClick={() => window.scrollTo(0, 1874)}
      >
        클릭
      </button>
    </div>
  );
}
